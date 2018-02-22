import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../../actions/authActions';
import MainMenuDropDown from './MainMenuDropDown';
import _ from 'lodash';
import toastr from 'toastr';

class OnboardingHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.logoutClicked = this.logoutClicked.bind(this);
  }
  logoutClicked(event) {
    event.preventDefault();

    this.props.actions.logoutUser();
    this.redirect();
  }
  redirect() {
    toastr.success('Successfully Logged Out');

    this.context.router.history.push('/admin/login');
  }
  render() {
    return (
      <div className="fixed-top">
        <nav className="navbar navbar-toggleable-sm navbar-inverse bg-inverse app-navbar">
          <div className="navbar-header">
            <button className="navbar-toggler navbar-toggler-right hidden-md-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="../index.html">
              <i className="icon-menu icons mr-2"></i>
              HelixAI
            </a>
          </div>
          <div className="collapse navbar-collapse mr-auto justify-content-end" id="navbarResponsive">
            <div className="menu-item">

            </div>
          </div>
          <div className="user-info mr-20">
           <div className="flextable">
             <div className="flextable-item flextable-primary">
               <div className="flextable">
                 <div className="flextable-item flextable-primary"  style={{'paddingRight': '20px'}}>
                   {this.props.user.name}
                   <br />
                   {this.props.company.name}
                 </div>
                 <div className="flextable-item">
                   <MainMenuDropDown
                     user={this.props.user}
                     company={this.props.company}
                     onLogoutClicked={this.logoutClicked}
                   />
                 </div>
               </div>
             </div>
           </div>
          </div>
        </nav>
      </div>
    );
  }
}

OnboardingHeader.propTypes = {
  user: PropTypes.object.isRequired,
  company:PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired
};
OnboardingHeader.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.currentUser,
    company: state.auth.company
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingHeader);
