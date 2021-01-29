import { gql } from 'apollo-server-express';

import user from './user';
import course from './course';
import section from './section';
import enrollment from './enrollment';
import term from './term';

const base = gql`
  scalar Date
  scalar Time
  scalar DateTime

  type Query { _: Boolean }
  type Mutation { _: Boolean }
  type Subscription { _: Boolean }
`;

export default [base, term, course, section, user, enrollment];
