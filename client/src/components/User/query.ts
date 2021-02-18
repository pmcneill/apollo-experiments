import gql from 'graphql-tag';

export const QUERY_USER = gql`
  query Users{
    users {
      id
      first
      last
      email
    }
  }

  query User($id: ID!) {
    user(id: $id) {
      id
      first
      last
      name
      email
      enrollments {
        id
        type
        section {
          id
          sis_id
          term {
            id
            name
            starts
          }
        }
      }
    }
  }

  mutation CreateUser($first: String!, $last: String!, $email: String!) {
    createUser(first: $first, last: $last, email: $email) {
      id
      first
      last
      email
    }
  }
`;
