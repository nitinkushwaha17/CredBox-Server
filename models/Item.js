const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  is_custom: {
    type: Boolean,
    default: true,
    required: true,
  },
  counter_id: {
    type: mongoose.Types.ObjectId,
    ref: "Counter",
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  status_id: {
    type: mongoose.Types.ObjectId,
    ref: "Status",
    required: true,
  },
  tod_id: {
    type: mongoose.Types.ObjectId,
    ref: "Tod",
  },
});

module.exports = mongoose.model("Item", ItemSchema);
