import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import SignedIn from './components/SignedIn';

module.exports = (
  <Route path="/" component={App}>
    <Route path="home" component={Home}/>
    <Route path="signed_in" component={SignedIn}/>
  </Route>
);