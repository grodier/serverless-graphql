// started building and learning with https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// additional insight: https://www.robinwieruch.de/mongodb-express-setup-tutorial/
const mongoose = require('mongoose');
const Message = require('./message');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

UserSchema.post('remove', async function(doc, next) {
  console.log('REMOVVINNGG');
  await Message.deleteMany({ user: doc._id }).exec();
  next();
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
