const { ApolloServer } = require("apollo-server-micro");
const cors = require("micro-cors")();

const schema = require("./schema");
const resolvers = require("./resolvers");
const models = require("./models");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: { models, me: models.users[1] },
  introspection: true,
  playground: true
});

module.exports = cors(server.createHandler());
