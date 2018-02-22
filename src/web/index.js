/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import App from './components/App';
// import routes from './routes';
import './styles/main.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
        <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
