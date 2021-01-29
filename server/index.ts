import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';

import DataLoader from 'dataloader';
import loaders from './loaders';

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async (_req) => {
    // This is where we can look up a cookie or token request header and use that to
    // fill in current_user_id (or even look up the full user record)
    return {
      current_user_id: 1,
      loaders: {
        user: new DataLoader((keys: number[]) => loaders.User.batch(keys)),
        term: new DataLoader((keys: number[]) => loaders.Term.batch(keys)),
        course: new DataLoader((keys: number[]) => loaders.Course.batch(keys)),
        section: new DataLoader((keys: number[]) => loaders.Section.batch(keys)),
        enrollment: new DataLoader((keys: number[]) => loaders.Enrollment.batch(keys)),
      },
    };
  }
});

server.applyMiddleware({ app, path: '/gql' });

app.listen({ port: 8999 }, () => {
  console.log("Listening...");
});
