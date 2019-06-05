const uuidv4 = require('uuid/v4');

const Query = {
  messages: async (parent, args, { models }) => {
    return await models.Message.find({});
  },
  message: async (parent, { id }, { models }) => {
    return await models.Message.findById(id);
  }
};

const Mutation = {
  createMessage: async (parent, { text }, { me, models }) => {
    return await models.Message.create({
      text,
      userId: me.id
    });
  },

  deleteMessage: async (parent, { id }, { models }) => {
    return await models.Message.findByIdAndRemove(id);
  }
};

const Message = {
  user: async (message, args, { models }) => {
    return await models.User.findById(message.userId);
  }
};

module.exports = {
  Query,
  Mutation,
  Message
};
