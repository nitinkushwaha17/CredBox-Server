const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tod_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Tod",
  },
  cafeteria_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Cafeteria",
  },
});

module.exports = mongoose.model("Counter", CounterSchema);
