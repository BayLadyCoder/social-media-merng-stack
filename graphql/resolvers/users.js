const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const User = require("../../models/User");

require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "6h",
  });
};

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      // return jsonwebtoken
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(_, args) {
      const {
        username,
        email,
        password,
        confirmed_password,
      } = args.registerInput;

      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmed_password
      );
      if (!valid) {
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
        created_at: new Date().toISOString(),
      });

      const res = await newUser.save();

      // return jsonwebtoken
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
