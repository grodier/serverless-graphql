const { ApolloServer, gql } = require('apollo-server-micro');
const uuidv4 = require('uuid/v4');
const cors = require('micro-cors')();

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Mutation {
    createMessage(text: String!): Message!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

let users = {
  1: {
    id: '1',
    username: 'George Rodier',
    messageIds: [1]
  },
  2: {
    id: '2',
    username: 'Dave Davids',
    messageIds: [2]
  }
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2'
  }
};

const resolvers = {
  Query: {
    me: (parent, args, { me }) => me,
    user: (parent, { id }) => users[id],
    users: () => Object.values(users),
    message: (parent, { id }) => messages[id],
    messages: () => Object.values(messages)
  },
  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = { id, text, userId: me.id };

      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    }
  },
  User: {
    messages: user =>
      Object.values(messages).filter(message => message.userId === user.id)
  },
  Message: {
    user: message => users[message.userId]
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: { me: users[1] },
  introspection: true,
  playground: true
});

module.exports = cors(server.createHandler());
