const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  quotesToday: { type: Number, default: 0 },
  SavedOn: Date,
});


const User = mongoose.model("User", userSchema);

module.exports = User;