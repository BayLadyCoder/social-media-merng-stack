import React, { useContext } from "react";
import { Card, Button, Image, Label } from "semantic-ui-react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

const PostCard = ({ post }) => {
  const {
    id,
    content,
    username,
    created_at,
    likes,
    likeCount,
    commentCount,
  } = post;
  const { user } = useContext(AuthContext);

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
        <LikeButton user={user} post={{ id, username, likes, likeCount }} />

        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic icon="comments" />
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>

        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            onClick={() => console.log("Delete post!")}
            icon="trash"
            floated="right"
          />
        )}
      </Card.Content>
      <Card.Content extra></Card.Content>
    </Card>
  );
};

export default PostCard;
