const { ApolloServer, gql } = require("apollo-server-micro");
const cors = require("micro-cors")();

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  type User {
    id: ID!
    username: String!
  }
`;

let users = {
  1: {
    id: "1",
    username: "George Rodier"
  },
  2: {
    id: "2",
    username: "Dave Davids"
  }
};

const me = users[1];

const resolvers = {
  Query: {
    me: () => me,
    user: (parent, { id }) => users[id],
    users: () => Object.values(users)
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true
});

module.exports = cors(server.createHandler());
