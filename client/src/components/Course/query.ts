import gql from 'graphql-tag';

export const QUERY_COURSE = gql`
  query Courses {
    courses {
      id
      name
      code
    }
  }

  query Course($id: ID!) {
    course(id: $id) {
      id
      name
      code
      sections {
        id
        code
        term {
          id
          name
          starts
        }
      }
    }
  }
`;
