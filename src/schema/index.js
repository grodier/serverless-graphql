const { gql } = require("apollo-server-micro");

const userSchema = require("./user");
const messageSchema = require("./message");

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, messageSchema];
