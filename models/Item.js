const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  counter: {
    type: mongoose.Types.ObjectId,
    ref: "Counter",
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  tod: {
    type: mongoose.Types.ObjectId,
    ref: "Tod",
  },
});

module.exports = mongoose.model("Item", ItemSchema);
