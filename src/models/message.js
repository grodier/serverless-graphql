const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
