const mongoose = require("mongoose");
const { TOD } = require("../constants");

const TodSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: Object.values(TOD),
    required: true,
    unique: true,
  },
  start_time: {
    type: Number,
    minValue: 0,
    maxValue: 2359,
    required: true,
  },
  end_time: {
    type: Number,
    minValue: 0,
    maxValue: 2359,
    required: true,
  },
});

module.exports = mongoose.model("Tod", TodSchema);
