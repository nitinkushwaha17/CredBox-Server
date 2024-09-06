const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("City", CitySchema);
