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
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id: ID!
    created_at: String!
    content: String!
    username: String!
  }

  type Like {
    id: ID!
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
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(username: String!, password: String!): User!
    createPost(content: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, content: String!): Post!
    deleteComment(postId: String!, commentId: String!): Post!
    likePost(postId: ID!): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;
