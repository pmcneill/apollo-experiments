import gql from 'graphql-tag';

export const QUERY_USER = gql`
  mutation Enroll($section_id: ID!, $user_id: ID!, $type: String!) {
    enroll(section_id: $section_id, user_id: $user_id, type: $type) {
      id
      type
      user {
        id
        first
        last
      }
    }
  }

  mutation Unenroll($id: ID!) {
    unenroll(id: $id)
  }
`;
