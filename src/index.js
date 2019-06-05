const { ApolloServer } = require("apollo-server-micro");
const microAsyncFirst = require("./utils/microFirst");
const cors = require("micro-cors")();

const schema = require("./schema");
const resolvers = require("./resolvers");
const { connectDb, ...models } = require("./models");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => {
    return { models, me: models.User.findOne({}) };
  },
  introspection: true,
  playground: true
});

const dbHandler = microAsyncFirst(connectDb);

module.exports = cors(dbHandler(server.createHandler()));
