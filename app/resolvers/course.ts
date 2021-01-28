import { Resolvers } from './types';
import { Course, Section } from '../models';

const resolvers : Resolvers = {
  Query: {
    course: async (_, { id, code }) => {
      if ( id ) {
        return Course.findByPk(id);
      }

      return Course.findOne({
        where: {
          code,
        },
      });
    },

    courses: async () => {
      return Course.findAll();
    },
  },

  Course: {
    sections: async (c: Course) => {
      return Section.findAll({
        where: {
          course_id: c.id,
        },
      });
    },
  },
};

export default resolvers;
