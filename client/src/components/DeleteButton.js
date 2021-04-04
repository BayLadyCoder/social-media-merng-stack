import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
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

      // else {
      //   const data = cache.readQuery({ query: QUERY_GET_POSTS });
      //   console.log('data', data);
      //   cache.writeQuery({
      //     query: QUERY_GET_POSTS,
      //     data: {
      //       ...data,
      //       getPosts: data.getPosts.map((post) => {
      //         if (post.id !== postId) {
      //           post.comments.filter((comment) => comment.id !== commentId);
      //         }
      //         return post;
      //       }),
      //     },
      //   });
      // }
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
        onConfirm={() => deletePostOrComment()}
      />
    </>
  );
};

export default DeleteButton;
