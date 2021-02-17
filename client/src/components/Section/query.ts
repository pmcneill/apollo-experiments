import gql from 'graphql-tag';

export const QUERY_SECTION = gql`
  query Section($id: ID!) {
    section(id: $id) {
      id
      code
      sis_id
      term {
        id
        name
        starts
      }
      course {
        id
        name
        code
      }
      teachers {
        id
        user {
          id
          name
        }
      }
      students {
        id
        type
        user {
          id
          name
        }
      }
    }
  }
`;
