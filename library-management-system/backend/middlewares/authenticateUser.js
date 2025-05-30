const jwt = require("jsonwebtoken");
const { getCache } = require("../middlewares/cacheHelpers");

const SECRET_KEY = "librarymgm";


async function authenticateUser(req, res, next) {
    const token = req.header("Authorization");
    const actualToken = token.replace('Bearer ', '');

    if (!token) {
        return res.status(404).json({ message: "Access denied no token is provided" })
    }

    try {

        const decoded = jwt.verify(actualToken, SECRET_KEY);
        req.user = decoded;

        // getCache(`session:${decoded.userId}`).then((storedToken) => {
        //     if (storedToken !== actualToken) {
        //         return res.status(401).json({message: "Invalid or expired token."})
        //     }
        // }).catch((error) => {
        //     return res.status(500).json({message: "Internal server error."})
        // })

        // next();

        const storedToken = await getCache(`session:${decoded.userId}`);
        if (!storedToken || JSON.parse(storedToken) !== actualToken) {
            console.log("invalid token")
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        // All good
        next();


    } catch (error) {
        return res.status(404).json({ message: "Error is in middleware." });
    }
}

module.exports = authenticateUser;