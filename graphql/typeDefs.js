const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    created_at: String!
  }

  type Post {
    id: ID!
    content: String!
    created_at: String!
    username: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmed_password: String!
    email: String!
  }

  type Query {
    getPosts: [Post!]
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
  }
`;
