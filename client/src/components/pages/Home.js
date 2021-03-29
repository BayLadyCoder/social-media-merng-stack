import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import PostCard from "../PostCard";

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_GET_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Recent Posts</h1>
      <Grid columns={3} divided>
        <Grid.Row>
          {data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

const QUERY_GET_POSTS = gql`
  {
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

export default Home;
