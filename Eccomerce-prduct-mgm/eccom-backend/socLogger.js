const SocLog = require("./models/socLogger");

async function socLog(message) {
  await SocLog.create({ message });
}

module.exports = {
  info: socLog
};
