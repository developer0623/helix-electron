// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom';
// import { Link } from 'react-router-dom';
import routes from '../routes';
import { bindActionCreators } from 'redux';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

import AuthHeader from './auth/Header';
import AdminHeader from './common/headers/AdminHeader';
import CompanyHeader from './common/headers/CompanyHeader';
import LaboratoryHeader from './common/headers/LaboratoryHeader';
import OnboardingHeader from './common/headers/OnboardingHeader';

import ApplicationHeader from './common/headers/ApplicationHeader';
import LabHeader from './common/headers/LabHeader';


import LoadingDots from './common/LoadingDots';
import {connect} from 'react-redux';
import ReactGA from 'react-ga';
import toastr from 'toastr';

import Modal from 'boron/DropModal';

class App extends React.Component {
  constructor() {
    super();

    // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
    ReactGA.initialize(process.env.DASHBOARD_GA_TRACKING_ID);

    // This just needs to be called once since we have no routes in this case.
    ReactGA.pageview(window.location.pathname);

  }
  render() {
    const { header, footer } = this.props.pageState;
    let containerClass = 'container';
    if(header !='none') {
      document.body.classList.add('with-top-navbar');
    } else {
      document.body.classList.remove('with-top-navbar');
      containerClass = `${containerClass} full-width`;
    }

    return (
      <div>
        {header == 'auth' && <AuthHeader/>}
        {header == 'admin' && <AdminHeader/>}
        {header == 'company' && <CompanyHeader/>}
        {header == 'onboard' && <OnboardingHeader/>}
        {header == 'laboratory' && <LaboratoryHeader/>}
        {header == 'application' && <ApplicationHeader/>}
        {header == 'lab' && <LabHeader/>}
        <div className="content-wrapper">
          <div className="content">
            <div className={containerClass}>
              {this.props.loading && <LoadingDots interval={100} dots={20} />}
              {routes}
            </div>
          </div>
          {footer && <Footer/>}
        </div>      
      </div>
      
    );
  }
}
App.propTypes = {
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    pageState: state.pageState
  };
}
function mapDispatchToProps(dispatch) {
  return {dispatch};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
