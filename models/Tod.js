const mongoose = require("mongoose");

const TodSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "early_breakfast",
      "breakfast",
      "lunch",
      "snacks",
      "dinner",
      "all_day",
    ],
    required: true,
    unique: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Tod", TodSchema);
