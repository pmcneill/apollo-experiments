import gql from 'graphql-tag';

export const QUERY_TERM_SECTIONS = gql`
  query TermSections($id: ID!) {
    term(id: $id) {
      id
      name
      starts
      sections {
        id
        code
        sis_id
        course {
          id
          name
          code
        }
      }
    }
  }
`;
