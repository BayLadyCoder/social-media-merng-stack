import React, { useEffect, useState } from "react";
import { Button, Label, Icon, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { MUTATION_LIKE_POST } from "../util/graphql";

const LikeButton = ({ post: { id, likes, likeCount }, user }) => {
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(MUTATION_LIKE_POST, {
    onError(err) {
      console.log(err);
    },
    variables: { postId: id },
  });

  const TheLikeButton = user ? (
    isLiked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Popup
      inverted
      content={isLiked ? "Unlike post" : "Like post"}
      trigger={
        <Button as="div" labelPosition="right" onClick={likePost}>
          {TheLikeButton}
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
};

export default LikeButton;
