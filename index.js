const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const connectDB = require("./config/db");

const Post = require("./models/Post");

connectDB();

const typeDefs = gql`
  type Post {
    id: ID!
    content: String!
    created_at: String!
    username: String!
  }

  type Query {
    getPosts: [Post!]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at port 5000`);
});
