const uuidv4 = require('uuid/v4');

const Query = {
  users: async (parent, args, { models }) => {
    return await models.User.find({})
      .lean()
      .exec();
  },
  user: async (parent, { id }, { models }) => {
    return models.User.findById(id)
      .lean()
      .exec();
  },
  me: async (parent, args, { models, me }) => {
    return models.User.findById(me.id)
      .lean()
      .exec();
  }
};

const User = {
  messages: async (user, args, { models }) => {
    const messages = await models.Message.find({
      user: user.id
    });
    console.log(messages);
    return messages;
  }
};

module.exports = {
  Query,
  User
};
