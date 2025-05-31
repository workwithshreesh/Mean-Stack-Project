const redisClient = require('./redisClient');
const url = require('url');
const WebSocket = require('ws');
const jwt = require("jsonwebtoken");


module.exports = function setupssoAlert(wss) {
    
    const subscriber = redisClient.duplicate();
    subscriber.subscribe("sso_channel", (err, count) => {
        if (err) {
            console.error("Redis subscribe error", err);
        } else {
            console.log("Redis subscriber connected");
        }
    });

    subscriber.on("message", (channel, message) => {
        if (channel === "sso_channel") {
            const { userId } = JSON.parse(message);
            console.log("[REDIS] Alert for userId:", userId);

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && client.userId === userId) {
                    client.send(JSON.stringify({
                        type: "SSO_Alert",
                        message: "You have been logged out due to login from another device."
                    }));
                }
            });
        }
    });

    wss.on("connection", (ws, req) => {
        const params = url.parse(req.url, true).query;
        const token = params.token;

        if (!token) {
            console.log("No token provided in WebSocket connection");
            ws.close();
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "librarymgm");
            ws.userId = decoded.userId;
            console.log("[WS] Connected with userId:", ws.userId);
        } catch (e) {
            console.log("Invalid token in WebSocket:", e.message);
            ws.close();
        }
    });
}
