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

export type PageQueryVariables = Exact<{ [key: string]: never; }>;


export type PageQuery = { __typename?: 'Query', Page: Array<{ __typename?: 'Page', id: number, url: string, intervale: number, histories: Array<{ __typename?: 'History', id: number, status: string, date: any, responseTime: number, screenshot: string }> }> };


export const PageDocument = gql`
    query Page {
  Page {
    id
    url
    intervale
    histories {
      id
      status
      date
      responseTime
      screenshot
    }
  }
}
    `;

/**
 * __usePageQuery__
 *
 * To run a query within a React component, call `usePageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageQuery({
 *   variables: {
 *   },
 * });
 */
export function usePageQuery(baseOptions?: Apollo.QueryHookOptions<PageQuery, PageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageQuery, PageQueryVariables>(PageDocument, options);
      }
export function usePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageQuery, PageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageQuery, PageQueryVariables>(PageDocument, options);
        }
export type PageQueryHookResult = ReturnType<typeof usePageQuery>;
export type PageLazyQueryHookResult = ReturnType<typeof usePageLazyQuery>;
export type PageQueryResult = Apollo.QueryResult<PageQuery, PageQueryVariables>;