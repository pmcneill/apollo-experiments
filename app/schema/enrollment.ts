import { gql } from 'apollo-server-express';

export default gql`
  type Enrollment {
    id: ID!
    user: User!
    section: Section!
    type: String!
  }

  extend type Query {
    enrollment(id: ID!): Enrollment
  }

  extend type Mutation {
    enroll(section_id: ID!, user_id: ID!, type: String!) : Enrollment
    unenroll(id: ID!) : Boolean!
  }
`
