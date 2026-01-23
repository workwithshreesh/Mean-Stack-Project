const socLogger = require("../socLogger");

module.exports = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const time = new Date().toUTCString();
  // AUTH FAIL / LOGIN
  if (req.path.includes("login") && req.method === "POST") {
    await socLogger.info(
      `${time} Login attempt from ${ip} | body=${JSON.stringify(req.body)}`
    );
  }

  // SQLi / BODY
  if (req.body && Object.keys(req.body).length) {
    await socLogger.info(
      `${time} HTTP BODY ${req.method} ${req.originalUrl} from ${ip} | body=${JSON.stringify(req.body)}`
    );
  }

  // QUERY PARAMS
  if (Object.keys(req.query).length) {
    await socLogger.info(
      `${time} HTTP QUERY ${req.method} ${req.originalUrl} from ${ip} | params=${JSON.stringify(req.query)}`
    );
  }

  next();
};
