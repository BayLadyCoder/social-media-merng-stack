import React, { useState } from "react";
import { Button, Confirm, Popup } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import {
  MUTATION_DELETE_POST,
  QUERY_GET_POSTS,
  MUTATION_DELETE_COMMENT,
} from "../util/graphql";

const DeleteButton = ({ postId, callback, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? MUTATION_DELETE_COMMENT : MUTATION_DELETE_POST;
  const payload = commentId ? { postId, commentId } : { postId };

  const [deletePostOrComment] = useMutation(mutation, {
    variables: payload,
    onError(err) {
      console.error(err);
    },
    update(cache, result) {
      setConfirmOpen(false);
      if (callback) callback();
      if (!commentId) {
        const data = cache.readQuery({ query: QUERY_GET_POSTS });
        cache.writeQuery({
          query: QUERY_GET_POSTS,
          data: {
            ...data,
            getPosts: data.getPosts.filter((post) => post.id !== postId),
          },
        });
      }
    },
  });

  return (
    <>
      <Popup
        inverted
        content={commentId ? "Delete comment" : "Delete post"}
        trigger={
          <Button
            as="div"
            color="red"
            onClick={() => setConfirmOpen(true)}
            icon="trash"
            floated="right"
          />
        }
      />

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deletePostOrComment()}
      />
    </>
  );
};

export default DeleteButton;
