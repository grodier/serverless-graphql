const mongoose = require("mongoose");

const Message = require("./message");
const User = require("./user");

const connectDb = async () => {
  return await mongoose.connect(process.env.DATABASE_URL);
};

module.exports = {
  Message,
  User,
  connectDb
};
