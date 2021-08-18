const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput } = require('../../util/validators');
const { SECRETE_KEY } = require('../../config.js');
const User = require('../../models/User');

module.exports = {
  Mutation: {
    // parent / _: from previous action - required to have access to the args (second param)
    // args: destructured to 'registerInput' coming from ./typeDefs.js registerInput param in register method
    // context: (not used)
    // info: (not used)
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
      // TODO: Check if user already exists
      const user = await User.findOne({ username });
      if (user) {
        //   user already exists
        throw new UserInputError('Username is already registered', {
          // The following error object will be used on our front-end
          errors: {
            username: 'This username is already registered!',
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

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRETE_KEY,
        { expiresIn: '1h' }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
