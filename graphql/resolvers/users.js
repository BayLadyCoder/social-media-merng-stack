const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { validateRegisterInput } = require("../../util/validators");
const User = require("../../models/User");

require("dotenv").config();

module.exports = {
  Mutation: {
    async register(_, args) {
      const {
        username,
        email,
        password,
        confirmed_password,
      } = args.registerInput;

      // Validate user data
      const { isValid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmed_password
      );
      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      // Make sure user doesn't already exist
      const user = await User.findOne({ username });
      const userFindByEmail = await User.findOne({ email });

      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // User already have an account
      if (userFindByEmail) {
        throw new UserInputError("Invalid Credentials", {
          errors: {
            email: "Invalid Credentials",
          },
        });
      }

      //  hash password and create an auth token
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });

      const res = await newUser.save();

      // return jsonwebtoken
      const payload = {
        id: res.id,
        email: res.email,
        username: res.username,
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "6h",
      });

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
