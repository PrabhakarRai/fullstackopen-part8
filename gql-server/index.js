const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./models/gql');
const resolvers = require('./controllers/resolvers');
const context = require('./controllers/context');
const { PORT, MONGODB_URI } = require('./utils/config');

console.log('☁️ Connection to MongoDB');
console.log('🌍 URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('🚀 Connected to MongoDB');
}).catch((e) => {
  console.log('🔥 Error connection to MongoDB:', e.message);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
