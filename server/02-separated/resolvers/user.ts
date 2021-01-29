import { User, Message } from '../types';
import { Resolvers } from './types';

const resolvers : Resolvers = {
  Query: {
    me: (_, __, { me } ) => me,

    user: (_, { id }, { models }) => {
      console.log(id);

      return models.users[id];
    },

    users: (_, _args, { models }) => {
      return Object.values(models.users);
    },
  },

  User: {
    name: (parent: User) => `${parent.first} ${parent.last}`,
    sort_name: (parent: User) => `${parent.last} ${parent.first}`,
    messages: (u: User, _, { models } ) => Object.values(models.messages).filter((m: Message) => m.userId == u.id),
  }
};

export default resolvers;
