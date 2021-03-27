const { gql } = require("apollo-server");

module.exports = gql`
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
