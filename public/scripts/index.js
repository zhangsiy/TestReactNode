import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from './components/App';
import routes from './routes';

ReactDOM.render(
  (
    <Router routes={routes} history={browserHistory} />
  ),
  document.getElementById('app')
)
