import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../util/customHooks";
import { gql, useMutation } from "@apollo/client";

const PostForm = () => {
  const [errors, setErrors] = useState(null);
  const { handleChange, handleSubmit, values } = useForm(createPostCallBack, {
    content: "",
  });

  const [createPost] = useMutation(MUTATION_CREATE_POST, {
    update(_, result) {
      values.content = "";
    },
    variables: values,
    onError(err) {
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

const MUTATION_CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
      id
      content
      username
      created_at
      likes {
        id
        username
        created_at
      }
      comments {
        id
        username
        created_at
        content
      }
      likeCount
      commentCount
    }
  }
`;

export default PostForm;
