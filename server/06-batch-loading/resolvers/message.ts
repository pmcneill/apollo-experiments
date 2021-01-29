import { Resolvers } from './types';
import { Message } from '../models';

const resolvers : Resolvers = {
  Query: {
    messages: async () => {
      return Message.findAll();
    },

    message: async (_, { id }) => {
      return Message.findByPk(id);
    }
  },

  Mutation: {
    createMessage: async (_, { text }, { current_user_id }) => {
      return Message.create({
        text,
        user_id: current_user_id,
      });
    },
    deleteMessage: async (_, { id }) => {
      return Message.destroy({ where: { id } });
    },
    updateMessage: async (_, { id, text }) => {
      let msg = await Message.findByPk(id);

      if ( ! msg ) {
        return false;
      }

      msg.text = text;
      return msg.save();
    }
  },

  Message: {
    user: async (msg: Message, _args, { loaders } ) => {
      return loaders.user.load(msg.user_id);
    },
  },
};

export default resolvers;
