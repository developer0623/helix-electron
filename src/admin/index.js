/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import { configureStore, history } from './stores/configureStore';
import {ConnectedRouter} from 'react-router-redux';
import {Route} from 'react-router-dom';


// import configureStore from './stores/configureStore';
import { Provider } from 'react-redux';
import App from './components/App';
import {loadMe} from './actions/authActions';
import {loadSystem} from './actions/systemActions';
import {loadAllCompanies} from './actions/companyActions';
import {loadAllCustomSlotTypes} from './actions/systems/customSlotTypeActions';
import {loadAllRepositoryTypes} from './actions/systems/repositoryTypeActions';
import './styles/toolkit-light.css';
import './styles/application.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/simple-line-icons/css/simple-line-icons.css';
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/toastr/build/toastr.min.css';
import cookie from 'react-cookie';

const confStore = require('./stores/configureStore');
const store = confStore.configureStore();
const history = confStore.history;

// const store = configureStore();

const token = cookie.load('token');

 

if(token) {
  store.dispatch(loadMe());
  store.dispatch(loadSystem());
  store.dispatch(loadAllCustomSlotTypes());
  store.dispatch(loadAllRepositoryTypes());
} else {
  // this.props.history.push('/admin/login');
}


render(
  <Provider store={store}>  
    <div>
        <ConnectedRouter history={history}>
            <Route path="/admin" component={App}/>
        </ConnectedRouter>
    </div>
  </Provider>,
  document.getElementById('app')
);