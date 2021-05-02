import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient, HttpLink, InMemoryCache, ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://gql-prrai.herokuapp.com',
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
