import { Resolvers } from './types';
import { User, Message } from '../models';

const resolvers : Resolvers = {
  Query: {
    me: async (_, _args, { current_user_id }) => {
      return User.findByPk(current_user_id);
    },

    user: async (_, { id }) => {
      return User.findByPk(id, {
        include: [ Message ],
      });
    },

    users: async () => {
      return User.findAll();
    },
  },

  User: {
    name: (parent: User) => `${parent.first} ${parent.last}`,
    sort_name: (parent: User) => `${parent.last} ${parent.first}`,
    messages: async (u: User) => {
      return Message.findAll({
        where: {
          user_id: u.id
        }
      });
    }
  }
};

export default resolvers;
