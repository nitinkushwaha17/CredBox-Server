const mongoose = require("mongoose");
const { STATUS } = require("../constants");

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: Object.values(STATUS),
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Status", StatusSchema);
