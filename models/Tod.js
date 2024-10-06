const mongoose = require("mongoose");

const TodSchema = new mongoose.Schema({
  name: {
    type: String,
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
