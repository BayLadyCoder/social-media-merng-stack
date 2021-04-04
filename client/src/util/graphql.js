import { gql } from "@apollo/client";

// Query
export const QUERY_GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      content
      username
      created_at
      likeCount
      commentCount
      comments {
        id
        content
        username
      }
      likes {
        id
        username
      }
    }
  }
`;

export const QUERY_GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      content
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        content
        created_at
      }
    }
  }
`;

// Mutation

export const MUTATION_CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
      id
      content
      username
      created_at
      likes {
        id
        username
        created_at
      }
      comments {
        id
        username
        created_at
        content
      }
      likeCount
      commentCount
    }
  }
`;

export const MUTATION_LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      username
      likeCount
    }
  }
`;

export const MUTATION_DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const MUTATION_DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        created_at
        content
      }
      commentCount
    }
  }
`;

export const MUTATION_CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $content: String!) {
    createComment(postId: $postId, content: $content) {
      id
      content
      username
      created_at
      comments {
        id
        content
        username
        created_at
      }
      commentCount
    }
  }
`;
