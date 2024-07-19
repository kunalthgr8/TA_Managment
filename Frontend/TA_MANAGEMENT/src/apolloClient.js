// src/apolloClient.js
// import { ApolloClient, InMemoryCache, HttpLink,createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:8000/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('token'); // Retrieve token from local storage
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   };
// });

// const client = new ApolloClient({
//   // link: new HttpLink({ uri: 'http://localhost:8000/graphql' }),
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://34.84.120.55:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')) : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
