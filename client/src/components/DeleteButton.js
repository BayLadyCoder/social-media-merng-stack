import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { MUTATION_DELETE_POST, QUERY_GET_POSTS } from "../util/graphql";

const DeleteButton = ({ postId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(MUTATION_DELETE_POST, {
    variables: { postId },
    onError(err) {
      console.log(err);
    },
    update(cache, result) {
      setConfirmOpen(false);
      const data = cache.readQuery({ query: QUERY_GET_POSTS });
      cache.writeQuery({
        query: QUERY_GET_POSTS,
        data: {
          ...data,
          getPosts: data.getPosts.filter((post) => post.id !== postId),
        },
      });
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        onClick={() => setConfirmOpen(true)}
        icon="trash"
        floated="right"
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deletePost()}
      />
    </>
  );
};

export default DeleteButton;
