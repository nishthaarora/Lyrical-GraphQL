import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import SongList from './components/songList';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/app';
import songCreate from './components/songCreate';
import songDetail from './components/songDetail';


const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}></IndexRoute>
          <Route path="songs/new" component={songCreate}></Route>
          <Route path="songs/:id" component={songDetail}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
document.querySelector('#root')
);
