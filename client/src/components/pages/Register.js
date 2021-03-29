import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

const Register = () => {
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmed_password: "",
  });

  const handleOnChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted form");
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          value={value.username}
          onChange={(e) => handleOnChange(e)}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          value={value.email}
          onChange={(e) => handleOnChange(e)}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          value={value.password}
          onChange={(e) => handleOnChange(e)}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmed_password"
          value={value.confirmed_password}
          onChange={(e) => handleOnChange(e)}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
