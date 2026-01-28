const socLogger = require("../socLogger");

module.exports = async (req, res, next) => {
try{
    const ip = req.httpMidlewareip || req.connection.remoteAddress;
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
  console.log(JSON.stringify(req.headers))
  await socLogger.info(
      `${time} HTTP_HEADERS | ${req.method} ${req.originalUrl} | ip=${ip} | headers=${JSON.stringify(req.headers)}`
    );

} catch (error) {
  console.log(error)
}




  next();
};
