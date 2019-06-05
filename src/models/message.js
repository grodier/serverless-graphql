const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
});

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
