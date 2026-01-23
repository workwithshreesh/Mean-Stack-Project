const cron = require("node-cron");
const axios = require("axios");
const SocLog = require("../models/socLogger");

cron.schedule("*/1 * * * *", async () => {
  try {
    const logs = await SocLog.find().limit(100);

    if (!logs.length) return;

    // SOC FORMAT → LIST OF STRINGS
    const payload = {
      logs: logs.map(l => l.message)
    };

    const response = await axios.post(
      "http://localhost:8000/api/example",
      payload,
      { timeout: 10000 }
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
