const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

require("dotenv").config();

module.exports = {
  Mutation: {
    async register(_, args, context, info) {
      const {
        username,
        email,
        password,
        confirmed_password,
      } = args.registerInput;

      // TODO: Validate user data
      // TODO: Make sure user doesn't already exist
      // TODO: hash password and create an auth token

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "6h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
