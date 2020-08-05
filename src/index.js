/* eslint no-undef: 0 */

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Root, Routes } from 'react-static';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import localStorage from 'localStorage';
// apollo
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink
} from 'apollo-boost';
import { persistCache as PersistCache } from 'apollo-cache-persist';
import { ApolloProvider } from '@apollo/react-hooks';

const init = async () => {
  const server = process.env.REACT_APP_APOLLO_SERVER;
  const port = process.env.REACT_APP_PORTNUM;
  // set up protocol
  let transferProtocol = 'https';
  if (process.env.REACT_APP_PORTNUM) {
    transferProtocol = 'http';
  }
  // persist cache in Apollo
  const cache = new InMemoryCache();
  const persistCache = new PersistCache({
    cache,
    storage: window.localStorage,
  });
  // prep client with token
  // let token = 'undefined';
  // const ls = await JSON.parse(localStorage.getItem('apollodemo'));
  // if (ls) { token = ls.token; }

  const client = new ApolloClient({
    cache: cache,
    persistCache: persistCache,
    link: new ApolloLink((operation, forward) => {
      operation.setContext({
        // headers: {
        //   authorization: token ? `Bearer ${token}` : '',
        // }
      });
      return forward(operation);
    }).concat(
      new HttpLink({
        uri: `${transferProtocol}://${server}:${port}/graphql`,
        credentials: 'same-origin',
        resolvers: {},
      })
    ),
  });

  const Greeting = () => {
    // Do we have existing localStorage?
    // const weHaveLocalStorage = JSON.parse(localStorage.getItem('apollodemo'));
    // if (weHaveLocalStorage) {
      return (
        <Root>
          <ApolloProvider client={client}>
            <Suspense fallback={<div>Loading... </div>}>
              <App />
            </Suspense>
          </ApolloProvider>
        </Root>
      );
    // }
    // return (
    //   <Root>
    //     <ApolloProvider client={client}>
    //       <Suspense fallback={<div>Loading... </div>}>
    //         <BrowserRouter>
    //           <Switch>
    //             <Route
    //               component={App}
    //               path="/"
    //             />
    //             <Route component={() => (<div>404 Not found </div>)} />
    //             <Route render={() => <Routes />} />
    //           </Switch>
    //         </BrowserRouter>
    //       </Suspense>
    //     </ApolloProvider>
    //   </Root>
    // );
  }

  ReactDOM.render(<Greeting  />, document.getElementById('root'));
  serviceWorker.unregister();

};



init();
