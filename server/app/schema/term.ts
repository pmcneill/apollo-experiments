import { gql } from 'apollo-server-express';

export default gql`
  type Term {
    id: ID!
    name: String!
    starts: Date!
    sections: [Section]!
  }

  extend type Query {
    terms: [Term!]!
    term(id: ID!): Term
  }
`
