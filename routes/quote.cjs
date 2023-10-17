const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  text: String,
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quote", quoteSchema);
