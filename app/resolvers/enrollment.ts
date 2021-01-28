import { Resolvers } from './types';
import { Enrollment } from '../models';

const resolvers : Resolvers = {
  Query: {
    enrollment: async (_, { id }) => {
      return Enrollment.findByPk(id);
    },
  },

  Mutation: {
    enroll: async (_, { section_id, user_id, type }) => {
      return Enrollment.create({
        section_id,
        user_id,
        type,
      });
    },

    unenroll: async(_, { id }) => {
      let e = await Enrollment.findByPk(id);

      if ( e ) {
        return e.destroy();
      } else {
        return false;
      }
    },
  },

  Enrollment: {
    section: async (e: Enrollment, _, { loaders }) => {
      return loaders.section.load(e.section_id);
    },

    user: async (e: Enrollment, _, { loaders }) => {
      return loaders.user.load(e.user_id);
    },
  },
};

export default resolvers;
