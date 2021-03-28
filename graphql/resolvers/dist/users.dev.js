"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var _require = require("apollo-server"),
    UserInputError = _require.UserInputError;

var _require2 = require("../../util/validators"),
    validateRegisterInput = _require2.validateRegisterInput,
    validateLoginInput = _require2.validateLoginInput;

var User = require("../../models/User");

require("dotenv").config();

var generateToken = function generateToken(user) {
  var payload = {
    id: user.id,
    email: user.email,
    username: user.username
  };
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "6h"
  });
};

module.exports = {
  Mutation: {
    login: function login(username, password) {
      var _validateRegisterInpu, valid, errors, user, match, token;

      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _validateRegisterInpu = validateRegisterInput(username, password), valid = _validateRegisterInpu.valid, errors = _validateRegisterInpu.errors;

              if (valid) {
                _context.next = 3;
                break;
              }

              throw new UserInputError("Errors", {
                errors: errors
              });

            case 3:
              _context.next = 5;
              return regeneratorRuntime.awrap(User.findOne({
                username: username
              }));

            case 5:
              user = _context.sent;

              if (user) {
                _context.next = 9;
                break;
              }

              errors.general = "User not found";
              throw new UserInputError("User not found", {
                errors: errors
              });

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

            case 11:
              match = _context.sent;

              if (match) {
                _context.next = 15;
                break;
              }

              errors.general = "Wrong credentials";
              throw new UserInputError("Wrong credentials", {
                errors: errors
              });

            case 15:
              // return jsonwebtoken
              token = generateToken(user);
              return _context.abrupt("return", _objectSpread({}, user._doc, {
                id: user._id,
                token: token
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    register: function register(_, args) {
      var _args$registerInput, username, email, password, confirmed_password, _validateRegisterInpu2, valid, errors, user, userFindByEmail, hashedPassword, newUser, res, token;

      return regeneratorRuntime.async(function register$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _args$registerInput = args.registerInput, username = _args$registerInput.username, email = _args$registerInput.email, password = _args$registerInput.password, confirmed_password = _args$registerInput.confirmed_password; // Validate user data

              _validateRegisterInpu2 = validateRegisterInput(username, email, password, confirmed_password), valid = _validateRegisterInpu2.valid, errors = _validateRegisterInpu2.errors;

              if (valid) {
                _context2.next = 4;
                break;
              }

              throw new UserInputError("Errors", {
                errors: errors
              });

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(User.findOne({
                username: username
              }));

            case 6:
              user = _context2.sent;
              _context2.next = 9;
              return regeneratorRuntime.awrap(User.findOne({
                email: email
              }));

            case 9:
              userFindByEmail = _context2.sent;

              if (!user) {
                _context2.next = 12;
                break;
              }

              throw new UserInputError("Username is taken", {
                errors: {
                  username: "This username is taken"
                }
              });

            case 12:
              if (!userFindByEmail) {
                _context2.next = 14;
                break;
              }

              throw new UserInputError("Invalid Credentials", {
                errors: {
                  email: "Invalid Credentials"
                }
              });

            case 14:
              _context2.next = 16;
              return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

            case 16:
              hashedPassword = _context2.sent;
              newUser = new User({
                username: username,
                password: hashedPassword,
                email: email
              });
              _context2.next = 20;
              return regeneratorRuntime.awrap(newUser.save());

            case 20:
              res = _context2.sent;
              // return jsonwebtoken
              token = generateToken(res);
              return _context2.abrupt("return", _objectSpread({}, res._doc, {
                id: res._id,
                token: token
              }));

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }
};