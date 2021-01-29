import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { v4 as uuidv4 } from 'uuid';
import { User, Message } from './types';

import models from './models';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users["2886"]
  }
});

server.applyMiddleware({ app, path: '/gql' });

app.listen({ port: 8999 }, () => {
  console.log("Listening...");
});
