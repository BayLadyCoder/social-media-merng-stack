import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "../../util/customHooks";
import { AuthContext } from "../../context/auth";

const Register = ({ history }) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const initialForm = {
    username: "",
    email: "",
    password: "",
    confirmed_password: "",
  };

  const { handleChange, handleSubmit, values } = useForm(
    registerUserCallback,
    initialForm
  );

  const [registerUser, { loading }] = useMutation(MUTATION_REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      // this function will run once the mutation is done
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUserCallback() {
    registerUser();
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange(e)}
          error={errors.email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmed_password"
          type="password"
          value={values.confirmed_password}
          onChange={(e) => handleChange(e)}
          error={errors.confirmed_password}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const MUTATION_REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmed_password: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmed_password: $confirmed_password
      }
    ) {
      id
      email
      username
      created_at
      token
    }
  }
`;

export default Register;
