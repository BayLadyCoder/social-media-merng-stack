import React from "react";
import { Card, Button, Image } from "semantic-ui-react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { id, content, username, created_at, likeCount, commentCount } = post;

  const likePost = () => console.log("like post");

  const commentPost = () => console.log("comment post");

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/post/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>
          <Moment fromNow ago>
            {created_at}
          </Moment>
        </Card.Meta>
        <Card.Description>{content}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic={true}
          color="teal"
          content=""
          icon="heart"
          label={{
            basic: true,
            color: "teal",
            pointing: "left",
            content: likeCount,
          }}
          onClick={() => likePost()}
        />
        <Button
          basic={true}
          color="blue"
          content=""
          icon="comments"
          label={{
            basic: true,
            color: "blue",
            pointing: "left",
            content: commentCount,
          }}
          onClick={() => commentPost()}
        />
      </Card.Content>
      <Card.Content extra></Card.Content>
    </Card>
  );
};

export default PostCard;
