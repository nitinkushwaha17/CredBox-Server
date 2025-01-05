const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cafeteria: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Cafeteria",
  },
});

module.exports = mongoose.model("Counter", CounterSchema);
