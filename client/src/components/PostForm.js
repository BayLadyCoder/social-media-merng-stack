import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../util/customHooks";
import { useMutation } from "@apollo/client";
import { MUTATION_CREATE_POST, QUERY_GET_POSTS } from "../util/graphql";

const PostForm = () => {
  const [errors, setErrors] = useState(null);
  const { handleChange, handleSubmit, values } = useForm(createPostCallBack, {
    content: "",
  });

  const [createPost] = useMutation(MUTATION_CREATE_POST, {
    update(cache, { data: { createPost: createPostData } }) {
      const data = cache.readQuery({
        query: QUERY_GET_POSTS,
      });
      cache.writeQuery({
        query: QUERY_GET_POSTS,
        data: { ...data, getPosts: [createPostData, ...data.getPosts] },
      });
      values.content = "";
    },
    variables: values,
    onError(err) {
      console.error(err);
      setErrors(err.graphQLErrors[0].message);
    },
  });

  function createPostCallBack() {
    setErrors(null);
    createPost();
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)} noValidate>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi World!"
          name="content"
          onChange={(e) => handleChange(e)}
          value={values.content}
          error={errors}
        />
        <Button type="submit" color="teal" style={{ marginBottom: "20px" }}>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default PostForm;
