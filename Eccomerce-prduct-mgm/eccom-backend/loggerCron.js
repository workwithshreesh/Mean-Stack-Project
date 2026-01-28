const cron = require("node-cron");
const axios = require("axios");
const SocLog = require("./models/socLogger");

let cronStarted = false;

function startCron() {
  if (cronStarted) return;
  cronStarted = true;

  cron.schedule("*/1 * * * *", async () => {
    try {
      // Fetch oldest logs first
      const logs = await SocLog.find()
        .sort({ createdAt: 1 })
        .limit(100);

      if (!logs.length) return;

      const payload = {
        logs: logs.map(l => l.message)
      };

      console.log("Sending SOC logs:", payload.logs.length);

      const response = await axios.post(
        "http://10.125.167.226:3000/api/collect-logs",
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200) {
        const ids = logs.map(l => l._id);
        await SocLog.deleteMany({ _id: { $in: ids } });

        console.log(`Sent & deleted ${ids.length} SOC logs`);
      }

    } catch (err) {
      console.error("SOC LOG PUSH FAILED:", err.message);
    }
  });

  console.log("SOC log cron scheduled (every 1 min)");
}

module.exports = startCron;
