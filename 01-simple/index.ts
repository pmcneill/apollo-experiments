import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { v4 as uuidv4 } from 'uuid';

const typeDefs = gql`
  type User{
    id: ID!
    first: String!
    last: String!
    name: String
    sort_name: String

    messages: [Message!]
    message(id: ID!): Message
  }

  type Message{
    id: ID!
    text: String!
    user: User!
  }

  type Query {
    me: User,
    user(id: ID!): User
    users: [User!]
    messages: [Message!]!
    message(id: ID!): Message
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Message
  }
`;

type User = {
  id: string,
  first: string,
  last: string,
};

type Message = {
  id: string,
  text: string,
  userId: string,
};

const users : { [k: string] : User } = {
  "2886": { id: "2886", first: "Patrick", last: "McNeill" },
  "211": { id: "211", first: "Erin", last: "McNeill" },
  "1": { id: "1", first: "Admin", last: "Jones" },
};

const messages : { [k: string] : Message } = {
  1: { id: "1", text: "hello world", userId: "2886" },
  2: { id: "2", text: "fooooo", userId: "211" },
};

const resolvers = {
  Query: {
    me: () => users["2886"],
    user: (parent: any, args: { id: string }) => {
      console.log(parent);
      console.log(args.id);

      return users[args.id];
    },
    users: () => Object.values(users),

    messages: () => Object.values(messages),
    message: (_: any, { id } : { id: string }) => messages[id]
  },

  Mutation: {
    createMessage: (_: any, { text } : { text: string }, { me } : { me: User } ) => {
      const msg = {
        id: uuidv4(),
        text,
        userId: me.id
      };

      messages[msg.id] = msg;

      return msg;
    },
    deleteMessage: (_: any, { id } : { id: string }) => {
      if ( messages[id] ) {
        delete(messages[id]);
        return true;
      }
      return false;
    },
    updateMessage: (_: any, { id, text } : { id: string, text: string }) => {
      if ( messages[id] ) {
        messages[id].text = text;
        return messages[id];
      }
    }
  },

  Message: {
    user: (msg: Message) => {
      return users[msg.userId];
    },
  },

  User: {
    name: (parent: User) => `${parent.first} ${parent.last}`,
    sort_name: (parent: User) => `${parent.last} ${parent.first}`,
    messages: (u: User) => Object.values(messages).filter((m: Message) => m.userId == u.id),
  }
};

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    me: users["2886"]
  }
});

server.applyMiddleware({ app, path: '/gql' });

app.listen({ port: 8999 }, () => {
  console.log("Listening...");
});
