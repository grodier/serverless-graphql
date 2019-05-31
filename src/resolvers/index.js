const uuidv4 = require("uuid/v4");

const Query = {
  users: (parent, args, { models }) => Object.values(models.users),
  user: (parent, { id }, { models }) => models.users[id],
  me: (parent, args, { me }) => me,
  messages: (parent, args, { models }) => Object.values(models.messages),
  message: (parent, { id }, { models }) => models.messages[id]
};

const Mutation = {
  createMessage: (parent, { text }, { me, models }) => {
    const id = uuidv4();
    const message = {
      id,
      text,
      userId: me.id
    };

    models.messages[id] = message;
    models.users[me.id].messageIds.push(id);

    return message;
  },

  deleteMessage: (parent, { id }, { models }) => {
    const { [id]: message, ...otherMessages } = models.messages;

    if (!message) {
      return false;
    }

    models.messages = otherMessages;

    return true;
  }
};

const User = {
  messages: (user, args, { models }) => {
    return Object.values(models.messages).filter(
      message => message.userId === user.id
    );
  }
};

const Message = {
  user: (message, args, { models }) => models.users[message.userId]
};

module.exports = {
  Query,
  Mutation,
  User,
  Message
};
