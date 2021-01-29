import { Resolvers } from './types';
import { Term, Section } from '../models';

const resolvers : Resolvers = {
  Query: {
    term: async (_, { id }) => {
      return Term.findByPk(id);
    },

    terms: async () => {
      return Term.findAll();
    },
  },

  Term: {
    sections: async (t: Term) => {
      return Section.findAll({
        where: {
          term_id: t.id,
        },
      });
    },
  },
};

export default resolvers;
