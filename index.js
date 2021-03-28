const { ApolloServer } = require("apollo-server");
const connectDB = require("./config/db");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // passing request, so resolvers can get access to request header/body
});

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at port 5000`);
});
