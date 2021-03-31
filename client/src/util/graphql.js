import { gql } from "@apollo/client";

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
