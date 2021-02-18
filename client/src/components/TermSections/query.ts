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

  mutation createSection($course_id: ID!, $term_id: ID!, $code: String!) {
    createSection(course_id: $course_id, term_id: $term_id, code: $code) {
      id
      code
      sis_id
    }
  }
`;
