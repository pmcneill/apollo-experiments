import { gql } from 'apollo-server-express';

export default gql`
  type Course {
    id: ID!
    name: String!
    code: String!
    sections: [Section]!
  }

  extend type Query {
    course(id: ID, code: String): Course
    courses: [Course!]!
  }
`
