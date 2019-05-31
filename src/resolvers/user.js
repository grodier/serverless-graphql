const uuidv4 = require("uuid/v4");

const Query = {
  users: (parent, args, { models }) => Object.values(models.users),
  user: (parent, { id }, { models }) => models.users[id],
  me: (parent, args, { me }) => me
};

const User = {
  messages: (user, args, { models }) => {
    return Object.values(models.messages).filter(
      message => message.userId === user.id
    );
  }
};

module.exports = {
  Query,
  User
};
