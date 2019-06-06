const jwt = require('jsonwebtoken');
const { AuthenticationError, UserInputError } = require('apollo-server-micro');

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

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username }, secret, {
    expiresIn
  });
};

const Mutation = {
  signUp: async (parent, { username, email, password }, { models, secret }) => {
    const user = await models.User.create({
      username,
      email,
      password
    });

    return { token: createToken(user, secret, '30m') };
  },

  signIn: async (parent, { login, password }, { models, secret }) => {
    console.log('HERE');
    const user = await models.User.findByLogin(login);

    if (!user) {
      throw new UserInputError('No user found with this login credentials.');
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      throw new AuthenticationError('Invalid password.');
    }

    return { token: createToken(user, secret, '30m') };
  }
};

const User = {
  messages: async (user, args, { models }) => {
    const messages = await models.Message.find({
      user: user.id
    });
    return messages;
  },
  id: user => {
    return user._id;
  }
};

module.exports = {
  Query,
  Mutation,
  User
};
