const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  item_id: {
    type: mongoose.Types.ObjectId,
    ref: "Item",
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
