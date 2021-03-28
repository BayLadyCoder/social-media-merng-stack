const { ApolloServer, PubSub } = require("apollo-server");
const connectDB = require("./config/db");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

connectDB();

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  // passing request, so resolvers can get access to request header/body
  // pubsub = Public Subscription
});

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at port 5000`);
});
