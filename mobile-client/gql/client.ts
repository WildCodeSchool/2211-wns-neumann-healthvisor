import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import Constants from 'expo-constants';

const env = Constants.expoConfig?.extra;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: createHttpLink({
    uri: env?.REACT_APP_GRAPHQL_API_URL || "http://192.168.0.189:4000/graphql",
    credentials: 'include'
  }),
});

export default client;
