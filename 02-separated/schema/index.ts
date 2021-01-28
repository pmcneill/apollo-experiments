import { gql } from 'apollo-server-express';

import user from './user';
import message from './message';

const base = gql`
  type Query { _: Boolean }
  type Mutation { _: Boolean }
  type Subscription { _: Boolean }
`;

export default [base, user, message];
