import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};





export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  terms: Array<Term>;
  term?: Maybe<Term>;
  course?: Maybe<Course>;
  courses: Array<Course>;
  sections?: Maybe<Array<Maybe<Section>>>;
  section?: Maybe<Section>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  enrollment?: Maybe<Enrollment>;
};


export type QueryTermArgs = {
  id: Scalars['ID'];
};


export type QueryCourseArgs = {
  id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
};


export type QuerySectionsArgs = {
  course_id?: Maybe<Scalars['ID']>;
  term_id?: Maybe<Scalars['ID']>;
};


export type QuerySectionArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryEnrollmentArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  createSection: Section;
  changeStatus?: Maybe<Section>;
  createUser: User;
  enroll?: Maybe<Enrollment>;
  unenroll: Scalars['Boolean'];
};


export type MutationCreateSectionArgs = {
  course_id: Scalars['ID'];
  term_id: Scalars['ID'];
  code: Scalars['String'];
};


export type MutationChangeStatusArgs = {
  id: Scalars['ID'];
  status: Scalars['String'];
};


export type MutationCreateUserArgs = {
  first: Scalars['String'];
  last: Scalars['String'];
  email: Scalars['String'];
};


export type MutationEnrollArgs = {
  section_id: Scalars['ID'];
  user_id: Scalars['ID'];
  type: Scalars['String'];
};


export type MutationUnenrollArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
};

export type Term = {
  __typename?: 'Term';
  id: Scalars['ID'];
  name: Scalars['String'];
  starts: Scalars['Date'];
  sections?: Maybe<Array<Section>>;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  sections?: Maybe<Array<Section>>;
};

export type Section = {
  __typename?: 'Section';
  id: Scalars['ID'];
  course: Course;
  term: Term;
  code: Scalars['String'];
  sis_id: Scalars['String'];
  status: Scalars['String'];
  teachers: Array<Enrollment>;
  students: Array<Enrollment>;
  users?: Maybe<Array<User>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  first: Scalars['String'];
  last: Scalars['String'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  sort_name?: Maybe<Scalars['String']>;
  enrollments: Array<Maybe<Enrollment>>;
};

export type Enrollment = {
  __typename?: 'Enrollment';
  id: Scalars['ID'];
  user: User;
  section: Section;
  type: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = (
  { __typename?: 'Query' }
  & { courses: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'id' | 'name' | 'code'>
  )> }
);

export type CourseQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CourseQuery = (
  { __typename?: 'Query' }
  & { course?: Maybe<(
    { __typename?: 'Course' }
    & Pick<Course, 'id' | 'name' | 'code'>
    & { sections?: Maybe<Array<(
      { __typename?: 'Section' }
      & Pick<Section, 'id' | 'code'>
      & { term: (
        { __typename?: 'Term' }
        & Pick<Term, 'id' | 'name' | 'starts'>
      ) }
    )>> }
  )> }
);

export type SectionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SectionQuery = (
  { __typename?: 'Query' }
  & { section?: Maybe<(
    { __typename?: 'Section' }
    & Pick<Section, 'id' | 'code' | 'sis_id'>
    & { term: (
      { __typename?: 'Term' }
      & Pick<Term, 'id' | 'name' | 'starts'>
    ), course: (
      { __typename?: 'Course' }
      & Pick<Course, 'id' | 'name' | 'code'>
    ), teachers: Array<(
      { __typename?: 'Enrollment' }
      & Pick<Enrollment, 'id'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      ) }
    )>, students: Array<(
      { __typename?: 'Enrollment' }
      & Pick<Enrollment, 'id' | 'type'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      ) }
    )> }
  )> }
);

export type TermSectionsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TermSectionsQuery = (
  { __typename?: 'Query' }
  & { term?: Maybe<(
    { __typename?: 'Term' }
    & Pick<Term, 'id' | 'name' | 'starts'>
    & { sections?: Maybe<Array<(
      { __typename?: 'Section' }
      & Pick<Section, 'id' | 'code' | 'sis_id'>
      & { course: (
        { __typename?: 'Course' }
        & Pick<Course, 'id' | 'name' | 'code'>
      ) }
    )>> }
  )> }
);

export type CreateSectionMutationVariables = Exact<{
  course_id: Scalars['ID'];
  term_id: Scalars['ID'];
  code: Scalars['String'];
}>;


export type CreateSectionMutation = (
  { __typename?: 'Mutation' }
  & { createSection: (
    { __typename?: 'Section' }
    & Pick<Section, 'id' | 'code' | 'sis_id'>
  ) }
);

export type TermsQueryVariables = Exact<{ [key: string]: never; }>;


export type TermsQuery = (
  { __typename?: 'Query' }
  & { terms: Array<(
    { __typename?: 'Term' }
    & Pick<Term, 'id' | 'name' | 'starts'>
  )> }
);

export type TermQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TermQuery = (
  { __typename?: 'Query' }
  & { term?: Maybe<(
    { __typename?: 'Term' }
    & Pick<Term, 'id' | 'name' | 'starts'>
  )> }
);


export const CoursesDocument = gql`
    query Courses {
  courses {
    id
    name
    code
  }
}
    `;

/**
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCoursesQuery(baseOptions?: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
        return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, baseOptions);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, baseOptions);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const CourseDocument = gql`
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

/**
 * __useCourseQuery__
 *
 * To run a query within a React component, call `useCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseQuery(baseOptions: Apollo.QueryHookOptions<CourseQuery, CourseQueryVariables>) {
        return Apollo.useQuery<CourseQuery, CourseQueryVariables>(CourseDocument, baseOptions);
      }
export function useCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          return Apollo.useLazyQuery<CourseQuery, CourseQueryVariables>(CourseDocument, baseOptions);
        }
export type CourseQueryHookResult = ReturnType<typeof useCourseQuery>;
export type CourseLazyQueryHookResult = ReturnType<typeof useCourseLazyQuery>;
export type CourseQueryResult = Apollo.QueryResult<CourseQuery, CourseQueryVariables>;
export const SectionDocument = gql`
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

/**
 * __useSectionQuery__
 *
 * To run a query within a React component, call `useSectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSectionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSectionQuery(baseOptions: Apollo.QueryHookOptions<SectionQuery, SectionQueryVariables>) {
        return Apollo.useQuery<SectionQuery, SectionQueryVariables>(SectionDocument, baseOptions);
      }
export function useSectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SectionQuery, SectionQueryVariables>) {
          return Apollo.useLazyQuery<SectionQuery, SectionQueryVariables>(SectionDocument, baseOptions);
        }
export type SectionQueryHookResult = ReturnType<typeof useSectionQuery>;
export type SectionLazyQueryHookResult = ReturnType<typeof useSectionLazyQuery>;
export type SectionQueryResult = Apollo.QueryResult<SectionQuery, SectionQueryVariables>;
export const TermSectionsDocument = gql`
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

/**
 * __useTermSectionsQuery__
 *
 * To run a query within a React component, call `useTermSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTermSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTermSectionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTermSectionsQuery(baseOptions: Apollo.QueryHookOptions<TermSectionsQuery, TermSectionsQueryVariables>) {
        return Apollo.useQuery<TermSectionsQuery, TermSectionsQueryVariables>(TermSectionsDocument, baseOptions);
      }
export function useTermSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermSectionsQuery, TermSectionsQueryVariables>) {
          return Apollo.useLazyQuery<TermSectionsQuery, TermSectionsQueryVariables>(TermSectionsDocument, baseOptions);
        }
export type TermSectionsQueryHookResult = ReturnType<typeof useTermSectionsQuery>;
export type TermSectionsLazyQueryHookResult = ReturnType<typeof useTermSectionsLazyQuery>;
export type TermSectionsQueryResult = Apollo.QueryResult<TermSectionsQuery, TermSectionsQueryVariables>;
export const CreateSectionDocument = gql`
    mutation createSection($course_id: ID!, $term_id: ID!, $code: String!) {
  createSection(course_id: $course_id, term_id: $term_id, code: $code) {
    id
    code
    sis_id
  }
}
    `;
export type CreateSectionMutationFn = Apollo.MutationFunction<CreateSectionMutation, CreateSectionMutationVariables>;

/**
 * __useCreateSectionMutation__
 *
 * To run a mutation, you first call `useCreateSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSectionMutation, { data, loading, error }] = useCreateSectionMutation({
 *   variables: {
 *      course_id: // value for 'course_id'
 *      term_id: // value for 'term_id'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useCreateSectionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSectionMutation, CreateSectionMutationVariables>) {
        return Apollo.useMutation<CreateSectionMutation, CreateSectionMutationVariables>(CreateSectionDocument, baseOptions);
      }
export type CreateSectionMutationHookResult = ReturnType<typeof useCreateSectionMutation>;
export type CreateSectionMutationResult = Apollo.MutationResult<CreateSectionMutation>;
export type CreateSectionMutationOptions = Apollo.BaseMutationOptions<CreateSectionMutation, CreateSectionMutationVariables>;
export const TermsDocument = gql`
    query Terms {
  terms {
    id
    name
    starts
  }
}
    `;

/**
 * __useTermsQuery__
 *
 * To run a query within a React component, call `useTermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTermsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTermsQuery(baseOptions?: Apollo.QueryHookOptions<TermsQuery, TermsQueryVariables>) {
        return Apollo.useQuery<TermsQuery, TermsQueryVariables>(TermsDocument, baseOptions);
      }
export function useTermsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermsQuery, TermsQueryVariables>) {
          return Apollo.useLazyQuery<TermsQuery, TermsQueryVariables>(TermsDocument, baseOptions);
        }
export type TermsQueryHookResult = ReturnType<typeof useTermsQuery>;
export type TermsLazyQueryHookResult = ReturnType<typeof useTermsLazyQuery>;
export type TermsQueryResult = Apollo.QueryResult<TermsQuery, TermsQueryVariables>;
export const TermDocument = gql`
    query Term($id: ID!) {
  term(id: $id) {
    id
    name
    starts
  }
}
    `;

/**
 * __useTermQuery__
 *
 * To run a query within a React component, call `useTermQuery` and pass it any options that fit your needs.
 * When your component renders, `useTermQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTermQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTermQuery(baseOptions: Apollo.QueryHookOptions<TermQuery, TermQueryVariables>) {
        return Apollo.useQuery<TermQuery, TermQueryVariables>(TermDocument, baseOptions);
      }
export function useTermLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermQuery, TermQueryVariables>) {
          return Apollo.useLazyQuery<TermQuery, TermQueryVariables>(TermDocument, baseOptions);
        }
export type TermQueryHookResult = ReturnType<typeof useTermQuery>;
export type TermLazyQueryHookResult = ReturnType<typeof useTermLazyQuery>;
export type TermQueryResult = Apollo.QueryResult<TermQuery, TermQueryVariables>;