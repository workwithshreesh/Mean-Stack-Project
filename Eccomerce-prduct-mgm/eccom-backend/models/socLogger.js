const mongoose = require("mongoose");

const SocLogSchema = new mongoose.Schema({
  message: { type: String, required: true }, // SOC formatted log
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SocLog", SocLogSchema);
