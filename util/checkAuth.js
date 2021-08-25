const jwt = require('jsonwebtoken');
const { SECRETE_KEY } = require('../config');
const { AuthenticationError } = require('apollo-server');

module.exports = context => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        const user = jwt.verify(token, SECRETE_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid or expired token');
      }
    }
    throw new Error("Auth Token must be 'Bearer [token]'");
  }
  throw new Error('Authorization Header must be provided');
};
