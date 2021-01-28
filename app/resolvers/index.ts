import user from './user';
import course from './course';
import term from './term';
import section from './section';
import enrollment from './enrollment';

import { DateResolver, TimeResolver, DateTimeResolver, } from 'graphql-scalars';

export default [
  {
    Date: DateResolver,
    DateTime: DateTimeResolver,
    Time: TimeResolver,
  },
  user,
  course,
  term,
  section,
  enrollment,
];
