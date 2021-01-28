import { gql } from 'apollo-server-express';

export default gql`
  type Section {
    id: ID!
    course: Course!
    term: Term!
    code: String!
    sis_id: String!
    status: String!
    teachers: [Enrollment]!
    students: [Enrollment]!
    users: [User]!
  }

  extend type Query {
    sections(course_id: ID, term_id: ID): [Section]
    section(id: ID!): Section
  }

  extend type Mutation {
    createSection(course_id: ID!, term_id: ID!, code: String!): Section!
    changeStatus(id: ID!, status: String!): Section
  }
`
