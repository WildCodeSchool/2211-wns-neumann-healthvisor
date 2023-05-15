import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type FetchInput = {
  id: Scalars['Float'];
};

export type History = {
  __typename?: 'History';
  date: Scalars['DateTime'];
  id: Scalars['Float'];
  page: Page;
  responseTime: Scalars['Float'];
  screenshot: Scalars['String'];
  status: Scalars['String'];
};

export type HistoryInput = {
  date: Scalars['DateTime'];
  id: Scalars['Float'];
  page: Scalars['Float'];
  responseTime: Scalars['Float'];
  status: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPage: Page;
  createUser: User;
  getPage: History;
  loginUser: Scalars['String'];
  logoutUser: Scalars['Boolean'];
};


export type MutationCreatePageArgs = {
  data: PageInput;
};


export type MutationCreateUserArgs = {
  data: SigninInput;
};


export type MutationGetPageArgs = {
  data: PageInput;
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};

export type Page = {
  __typename?: 'Page';
  histories: Array<History>;
  id: Scalars['Float'];
  intervale: Scalars['Float'];
  url: Scalars['String'];
};

export type PageInput = {
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  History: Array<History>;
  Page: Array<Page>;
  fetchHistoryById: History;
  fetchLastHistoryPageById: History;
  fetchUserById: User;
  profile: User;
  users: Array<User>;
};


export type QueryFetchHistoryByIdArgs = {
  id: Scalars['Int'];
};


export type QueryFetchLastHistoryPageByIdArgs = {
  id: Scalars['Int'];
};


export type QueryFetchUserByIdArgs = {
  id: Scalars['Int'];
};

export type SigninInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Float'];
  premium?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['Float']>;
};

export type CreateUserMutationVariables = Exact<{
  data: SigninInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, id: number } };

export type HistoryQueryVariables = Exact<{
  fetchHistoryByIdId: Scalars['Int'];
}>;


export type HistoryQuery = { __typename?: 'Query', fetchHistoryById: { __typename?: 'History', date: any, id: number, responseTime: number, screenshot: string, status: string } };

export type FetchLastHistoryPageByIdQueryVariables = Exact<{
  fetchLastHistoryPageById: Scalars['Int'];
}>;


export type FetchLastHistoryPageByIdQuery = { __typename?: 'Query', fetchLastHistoryPageById: { __typename?: 'History', id: number, date: any, responseTime: number, screenshot: string, status: string } };

export type FetchUserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FetchUserByIdQuery = { __typename?: 'Query', fetchUserById: { __typename?: 'User', email: string, id: number, premium?: boolean | null, role?: number | null } };

export type GetPageMutationVariables = Exact<{
  data: PageInput;
}>;


export type GetPageMutation = { __typename?: 'Mutation', getPage: { __typename?: 'History', id: number, status: string, date: any, responseTime: number, screenshot: string } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', email: string, id: number, premium?: boolean | null, role?: number | null } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, email: string, premium?: boolean | null, role?: number | null }> };

export type LoginUserMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: string };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };


export const CreateUserDocument = gql`
    mutation CreateUser($data: SigninInput!) {
  createUser(data: $data) {
    email
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const HistoryDocument = gql`
    query History($fetchHistoryByIdId: Int!) {
  fetchHistoryById(id: $fetchHistoryByIdId) {
    date
    id
    responseTime
    screenshot
    status
  }
}
    `;

/**
 * __useHistoryQuery__
 *
 * To run a query within a React component, call `useHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHistoryQuery({
 *   variables: {
 *      fetchHistoryByIdId: // value for 'fetchHistoryByIdId'
 *   },
 * });
 */
export function useHistoryQuery(baseOptions: Apollo.QueryHookOptions<HistoryQuery, HistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HistoryQuery, HistoryQueryVariables>(HistoryDocument, options);
      }
export function useHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HistoryQuery, HistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HistoryQuery, HistoryQueryVariables>(HistoryDocument, options);
        }
export type HistoryQueryHookResult = ReturnType<typeof useHistoryQuery>;
export type HistoryLazyQueryHookResult = ReturnType<typeof useHistoryLazyQuery>;
export type HistoryQueryResult = Apollo.QueryResult<HistoryQuery, HistoryQueryVariables>;
export const FetchLastHistoryPageByIdDocument = gql`
    query FetchLastHistoryPageById($fetchLastHistoryPageById: Int!) {
  fetchLastHistoryPageById(id: $fetchLastHistoryPageById) {
    id
    date
    responseTime
    screenshot
    status
  }
}
    `;

/**
 * __useFetchLastHistoryPageByIdQuery__
 *
 * To run a query within a React component, call `useFetchLastHistoryPageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchLastHistoryPageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchLastHistoryPageByIdQuery({
 *   variables: {
 *      fetchLastHistoryPageById: // value for 'fetchLastHistoryPageById'
 *   },
 * });
 */
export function useFetchLastHistoryPageByIdQuery(baseOptions: Apollo.QueryHookOptions<FetchLastHistoryPageByIdQuery, FetchLastHistoryPageByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchLastHistoryPageByIdQuery, FetchLastHistoryPageByIdQueryVariables>(FetchLastHistoryPageByIdDocument, options);
      }
export function useFetchLastHistoryPageByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchLastHistoryPageByIdQuery, FetchLastHistoryPageByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchLastHistoryPageByIdQuery, FetchLastHistoryPageByIdQueryVariables>(FetchLastHistoryPageByIdDocument, options);
        }
export type FetchLastHistoryPageByIdQueryHookResult = ReturnType<typeof useFetchLastHistoryPageByIdQuery>;
export type FetchLastHistoryPageByIdLazyQueryHookResult = ReturnType<typeof useFetchLastHistoryPageByIdLazyQuery>;
export type FetchLastHistoryPageByIdQueryResult = Apollo.QueryResult<FetchLastHistoryPageByIdQuery, FetchLastHistoryPageByIdQueryVariables>;
export const FetchUserByIdDocument = gql`
    query FetchUserById($id: Int!) {
  fetchUserById(id: $id) {
    email
    id
    premium
    role
  }
}
    `;

/**
 * __useFetchUserByIdQuery__
 *
 * To run a query within a React component, call `useFetchUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchUserByIdQuery(baseOptions: Apollo.QueryHookOptions<FetchUserByIdQuery, FetchUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserByIdQuery, FetchUserByIdQueryVariables>(FetchUserByIdDocument, options);
      }
export function useFetchUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserByIdQuery, FetchUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserByIdQuery, FetchUserByIdQueryVariables>(FetchUserByIdDocument, options);
        }
export type FetchUserByIdQueryHookResult = ReturnType<typeof useFetchUserByIdQuery>;
export type FetchUserByIdLazyQueryHookResult = ReturnType<typeof useFetchUserByIdLazyQuery>;
export type FetchUserByIdQueryResult = Apollo.QueryResult<FetchUserByIdQuery, FetchUserByIdQueryVariables>;
export const GetPageDocument = gql`
    mutation GetPage($data: PageInput!) {
  getPage(data: $data) {
    id
    status
    date
    responseTime
    screenshot
  }
}
    `;
export type GetPageMutationFn = Apollo.MutationFunction<GetPageMutation, GetPageMutationVariables>;

/**
 * __useGetPageMutation__
 *
 * To run a mutation, you first call `useGetPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getPageMutation, { data, loading, error }] = useGetPageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPageMutation(baseOptions?: Apollo.MutationHookOptions<GetPageMutation, GetPageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetPageMutation, GetPageMutationVariables>(GetPageDocument, options);
      }
export type GetPageMutationHookResult = ReturnType<typeof useGetPageMutation>;
export type GetPageMutationResult = Apollo.MutationResult<GetPageMutation>;
export type GetPageMutationOptions = Apollo.BaseMutationOptions<GetPageMutation, GetPageMutationVariables>;
export const GetProfileDocument = gql`
    query getProfile {
  profile {
    email
    id
    premium
    role
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    premium
    role
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginInput!) {
  loginUser(data: $data)
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;