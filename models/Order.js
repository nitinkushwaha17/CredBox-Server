const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  item: {
    type: mongoose.Types.ObjectId,
    ref: "Item",
  },
  status: {
    type: mongoose.Types.ObjectId,
    ref: "Status",
    required: true,
  },
  is_custom: {
    type: Boolean,
    default: false,
  },
  custom_item: {
    name: String,
    price: Number,
    counter_name: String,
    tod: {
      type: mongoose.Types.ObjectId,
      ref: "Tod",
    },
  },
  Ordered_at: {
    type: Date,
    default: Date.now(),
  },
  order_pin: String,
  accepted_at: {
    type: Date,
  },
  accepted_by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  expireAt: Date,
});

module.exports = mongoose.model("Order", OrderSchema);
