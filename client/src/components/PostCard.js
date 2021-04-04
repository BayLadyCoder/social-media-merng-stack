import React, { useContext } from "react";
import { Card, Button, Image, Label, Popup } from "semantic-ui-react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

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
        <Popup
          inverted
          content={username}
          trigger={
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          }
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
        <Popup
          inverted
          content="Add a comment"
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="blue" basic icon="comments" />
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />

        {user && user.username === username && (
          <DeleteButton user={user} postId={id} />
        )}
      </Card.Content>
      <Card.Content extra></Card.Content>
    </Card>
  );
};

export default PostCard;
