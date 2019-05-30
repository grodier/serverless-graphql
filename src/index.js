const { ApolloServer, gql } = require('apollo-server-micro');
const cors = require('micro-cors')();

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`;

const resolvers = {
  Query: {
    me: () => ({ username: 'George Rodier' })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

module.exports = cors(server.createHandler());
