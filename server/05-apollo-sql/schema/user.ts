import { gql } from 'apollo-server-express';

export default gql`
  type User{
    id: ID!
    first: String!
    last: String!
    name: String
    sort_name: String

    messages: [Message!]
    message(id: ID!): Message
  }

  extend type Query {
    me: User,
    user(id: ID!): User
    users: [User!]
  }
`;
