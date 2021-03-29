import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../util/customHooks";
import { gql, useMutation } from "@apollo/client";

const PostForm = () => {
  const { handleChange, handleSubmit, values } = useForm(
    createPostCallBack,
    {}
  );

  const [createPost, { error }] = useMutation(MUTATION_CREATE_POST, {
    variables: values,
    update(_, result) {
      console.log(result);
      values.content = "";
    },
  });

  function createPostCallBack() {
    createPost();
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi World!"
          name="content"
          onChange={handleChange}
          value={values.content}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

const MUTATION_CREATE_POST = gql`
  mutation createPost($content: Sting!) {
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
`;

export default PostForm;
