const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer ...
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid token");
      }
    }
    throw new AuthenticationError("Invalid token format");
  }
  throw new AuthenticationError("Authorization header must be provided");
};
