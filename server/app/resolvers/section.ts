import { Op } from 'sequelize';
import { Resolvers } from './types';
import { Term, Course, Section, Enrollment, User } from '../models';

const resolvers : Resolvers = {
  Query: {
    section: async (_, { id }) => {
      return Section.findByPk(id);
    },

    sections: async (_, args ) => {
      return Section.findAll({ where: args });
    },
  },

  Mutation: {
    createSection: async(_, { course_id, term_id, code }) => {
      return Section.create({
        course_id,
        term_id,
        code
      });
    },

    changeStatus: async(_, { id, status }) => {
      let s = await Section.findByPk(id);

      if ( s ) {
        s.status = status;
        return s.save();
      } else {
        return false;
      }
    },
  },

  Section: {
    sis_id: async (s: Section, _, { loaders }) => {
      let term = await loaders.term.load(s.term_id) as Term,
        course = await loaders.course.load(s.course_id) as Course;

      return `${term.name} ${course.code}.${s.code}`;
    },

    users: async (s: Section) => {
      return s.$get('users');
    },

    course: async (s: Section) => {
      return s.$get('course');
    },

    term: async (s: Section) => {
      return s.$get('term');
    },

    students: async (s: Section) => {
      return await Enrollment.findAll({
        where: {
          section_id: s.id,
          type: {
            [Op.notIn]: [ 'teacher', 'auditor' ],
          },
        },
        include: [User],
      });
    },

    teachers: async (s: Section) => {
      return await Enrollment.findAll({
        where: {
          section_id: s.id,
          type: 'teacher',
        },
        include: [User],
      });
    },
  },
};

export default resolvers;
