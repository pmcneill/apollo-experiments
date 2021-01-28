import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import models from './models';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async (_req) => {
    // This is where we can look up a cookie or token request header and use that to
    // fill in current_user_id (or even look up the full user record)
    return {
      current_user_id: 1
    };
  }
});

server.applyMiddleware({ app, path: '/gql' });

app.listen({ port: 8999 }, () => {
  console.log("Listening...");
});
