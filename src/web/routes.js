import React from 'react';
import {Route} from 'react-router-dom';
import App from './components/App';
import HomePage from './components/home/HomePage';
import PrivacyPolicyPage from './components/company/PrivacyPolicyPage';
import RegisterPage from './components/register/RegisterPage';
import LoginPage from './components/login/LoginPage';
import AboutPage from './components/about/AboutPage';
import GrantPage from './components/oauth/GrantPage';

export default (
  <div>
		<Route exact component={HomePage}/>
    <Route path="company/privacy-policy" component={PrivacyPolicyPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="login" component={LoginPage} />
    <Route path="oauth2" component={GrantPage} />
	</div>
);
