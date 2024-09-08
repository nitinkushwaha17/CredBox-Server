const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  cafeteria: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Cafeteria",
  },
});

module.exports = mongoose.model("User", UserSchema);
