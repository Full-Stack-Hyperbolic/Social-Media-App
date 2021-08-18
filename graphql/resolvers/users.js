const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRETE_KEY } = require('../../config.js');
const User = require('../../models/User');

module.exports = {
  Mutation: {
    // parent/_: from previous action
    // args: destructured to 'registerInput' coming from ./typeDefs.js registerInput param in register method
    // context:
    // info:
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data
      // TODO: Check if user already exists
      // TODO: Hash password for db & create auth token
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
