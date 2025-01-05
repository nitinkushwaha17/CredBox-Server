const mongoose = require("mongoose");

const CafeteriaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: mongoose.Types.ObjectId,
    ref: "City",
    required: true,
  },
});

module.exports = mongoose.model("Cafeteria", CafeteriaSchema);
