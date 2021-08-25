const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');
const PORT = process.env.PORT || 5000;

// Create server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('MongoDb Successfully Connected');
    return server.listen(PORT);
  })
  .then(() => {
    console.log(`Server sucessfully stared on port ${PORT}`);
  });
