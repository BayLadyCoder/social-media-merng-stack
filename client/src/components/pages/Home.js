import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../PostCard";
import PostForm from "../PostForm";
import { AuthContext } from "../../context/auth";
import { QUERY_GET_POSTS } from "../../util/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(QUERY_GET_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Recent Posts</h1>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>

      <Grid columns={3} divided>
        <Grid.Row>
          <Transition.Group>
            {data.getPosts.map((post) => (
              <Grid.Column key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Home;
