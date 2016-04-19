import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import SignedIn from './components/SignedIn';
import Todo from './components/Todo';
import Test from './components/Test';

module.exports = (
  <Route path="/" component={App} >
    <Route path="test" component={Test} />
    <Route path="todo" component={Todo} />
  </Route>
);