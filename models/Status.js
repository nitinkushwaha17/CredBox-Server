const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["new", "in_process", "completed", "expired"],
    required: true,
  },
  time_accepted: {
    type: Date,
  },
  accepted_by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Status", StatusSchema);
