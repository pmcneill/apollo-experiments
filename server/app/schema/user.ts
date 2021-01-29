import { gql } from 'apollo-server-express';

export default gql`
  type User{
    id: ID!
    first: String!
    last: String!
    email: String!
    name: String
    sort_name: String

    enrollments: [Enrollment]!
  }

  extend type Query {
    me: User,
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    createUser(first: String!, last: String!, email: String!): User!
  }
`;
