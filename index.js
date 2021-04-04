const { ApolloServer, PubSub } = require("apollo-server");
require("dotenv").config();

const connectDB = require("./config/db");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const PORT = process.env.PORT || 5000;

connectDB();

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  // passing request, so resolvers can get access to request header/body
  // pubsub = Public Subscription
});

server.listen({ port: PORT }).then((res) => {
  console.log(`Server running at port ${PORT}`);
});
