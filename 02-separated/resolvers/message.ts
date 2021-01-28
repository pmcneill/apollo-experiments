import { v4 as uuidv4 } from 'uuid';
import { User, Message } from '../types';
import { Resolvers } from './types';

const resolvers : Resolvers = {
  Query: {
    messages: (_, _args, { models }) => {
      return Object.values(models.messages);
    },

    message: (_, { id }, { models }) => {
      return models.messages[id]
    }
  },

  Mutation: {
    createMessage: (_, { text }, { me, models }) => {
      const msg = {
        id: uuidv4(),
        text,
        userId: me.id
      };

      models.messages[msg.id] = msg;

      return msg;
    },
    deleteMessage: (_, { id }, { models }) => {
      if ( models.messages[id] ) {
        delete(models.messages[id]);
        return true;
      }
      return false;
    },
    updateMessage: (_, { id, text }, { models }) => {
      if ( models.messages[id] ) {
        models.messages[id].text = text;
        return models.messages[id];
      }
    }
  },

  Message: {
    user: (msg: Message, _, { models }) => {
      return models.users[msg.userId];
    },
  },
};

export default resolvers;
