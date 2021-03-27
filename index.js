const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const connectDB = require("./config/db");

const Post = require("./models/Post");

connectDB();

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello World!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at port 5000`);
});
