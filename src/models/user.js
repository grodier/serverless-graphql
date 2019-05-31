// started building and learning with https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// additional insight: https://www.robinwieruch.de/mongodb-express-setup-tutorial/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
