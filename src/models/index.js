const mongoose = require('mongoose');

const Message = require('./message');
const User = require('./user');

const connectDb = async () => {
  console.log(process.env);
  console.log(process.env.DATABASE_URL);
  return await mongoose.connect(process.env.DATABASE_URL);
};

module.exports = {
  Message,
  User,
  connectDb
};
