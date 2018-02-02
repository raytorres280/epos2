import * as React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Main from './components/Main'
import './App.css';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: httpLink,
  cache
})

class App extends React.Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </ApolloProvider>
    );
  }
}

export default App;