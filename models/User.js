const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  cafeteria_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Cafeteria",
  },
});

module.exports = mongoose.model("User", UserSchema);
