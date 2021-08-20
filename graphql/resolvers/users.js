const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators');
const { SECRETE_KEY } = require('../../config.js');
const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRETE_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Mutation: {
    // parent / _: from previous action - required to have access to the args (second param)
    // args: destructured to 'registerInput' coming from ./typeDefs.js registerInput param in register method
    // context: (not used)
    // info: (not used)
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        // user doesn't exist
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Incorrect credentials';
        throw new UserInputError('Incorrect credentials', { errors });
      }

      const token = generateToken(user);

      // console.log('User = ', user);
      // console.log('User._doc = ', user._doc);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // TODO: Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors:', { errors });
      }
      // TODO: Check if user already exists
      const user =
        (await User.findOne({ username })) || User.findOne({ email });
      // const user2 = await User.findOne({ email });
      // if (user2) {
      //   throw new UserInputError('Email already exists, please use another');
      // }
      if (user) {
        //   user already exists
        throw new UserInputError('Username or email is already registered', {
          // The following error object will be used on our front-end
          errors: {
            username: 'This username or email is already registered!',
          },
        });
      }
      // Hash password for db & create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      //   Save new user to the database
      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
