import gql from 'graphql-tag';

export const QUERY_TERMS = gql`
  query Terms {
    terms {
      id
      name
      starts
    }
  }

  query Term($id: ID!) {
    term(id: $id) {
      id
      name
      starts
    }
  }
`;
