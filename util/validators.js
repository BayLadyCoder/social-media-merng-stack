module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmed_password
) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username is required";
  }

  if (email.trim() === "") {
    errors.email = "Email is required";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password is required";
  } else if (password !== confirmed_password) {
    errors.confirmed_password = "Passwords must match";
  }

  return {
    valid: Object.keys(errors).length < 1,
    errors,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username is required";
  }

  if (password.trim() === "") {
    errors.password = "Password is required";
  }

  return {
    valid: Object.keys(errors).length < 1,
    errors,
  };
};
