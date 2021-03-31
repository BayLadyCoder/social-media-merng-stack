import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "../../util/customHooks";
import { AuthContext } from "../../context/auth";

const Login = ({ history }) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const initialForm = {
    username: "",
    password: "",
  };

  const { handleChange, handleSubmit, values } = useForm(
    loginUserCallback,
    initialForm
  );

  const [loginUser, { loading }] = useMutation(MUTATION_LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      // this function will run once the mutation is done
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          onChange={(e) => handleChange(e)}
          error={errors.username}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={(e) => handleChange(e)}
          error={errors.password}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
};

const MUTATION_LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      created_at
      token
    }
  }
`;

export default Login;
