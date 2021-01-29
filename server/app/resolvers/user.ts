import { Resolvers } from './types';
import { User } from '../models';

const resolvers : Resolvers = {
  Query: {
    me: async (_, _args, { current_user_id }) => {
      return User.findByPk(current_user_id);
    },

    user: async (_, { id }) => {
      return User.findByPk(id);
    },

    users: async () => {
      return User.findAll();
    },
  },

  User: {
    name: (parent: User) => `${parent.first} ${parent.last}`,
    sort_name: (parent: User) => `${parent.last} ${parent.first}`,

    enrollments: async (u: User, _, { loaders } ) => {
      return loaders.enrollment.load(u.id);
    }
  },

  Mutation: {
    createUser: async (_, { first, last, email }) => {
      return User.create({
        first,
        last,
        email,
      });
    },
  },
};

export default resolvers;
