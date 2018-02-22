import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import LoginForm from './LoginForm';
import toastr from 'toastr';
import _ from 'lodash';
import {Link} from 'react-router-dom';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      credentials: Object.assign({}, this.props.credentials),
      hasError: false,
      error: '',
      errors: {},
      saving: false
    };
    this.updateCredentialsState = this.updateCredentialsState.bind(this);
    this.authenticateCredentials = this.authenticateCredentials.bind(this);
  }
  updateCredentialsState(event) {
    const field = event.target.name;
    let credentials = this.state.credentials;
    credentials[field] = event.target.value.trim();
    return this.setState({credentials: credentials});
  }
  authenticateCredentials(event) {
    event.preventDefault();
    this.setState({saving: true});
    if(this.props.user && this.props.user._id) {
      this.props.actions.logoutUser();
    }
    this.props.actions.authenticateUser(this.state.credentials)
    .then(() =>
      this.redirect()
    )
    .catch(error => {
      let errorMessage;
      if(this.props.networkError) {
        errorMessage = "Please check your internet connection";
      } else {
        errorMessage = "Invalid email address and password.";
      }
      this.setState({saving:false, hasError: true, error : errorMessage });
    });
  }
  redirect() {
    if(this.props.company.onboarding_complete) {
      this.context.router.history.push(`/admin/dashboard`);
    } else {
      this.context.router.history.push(`/admin/onboard`);
    }
  }
  render() {
    return (
      <div className="auth-box">
        <h2>Sign In to HelixAI</h2>
        <div className="login-box">
          <LoginForm
            credentials={this.state.credentials}
            onChange={this.updateCredentialsState}
            onAuthenticate={this.authenticateCredentials}
            saving={this.state.saving}
            errors={this.state.errors}
            hasError={this.state.hasError}
            error={this.state.error}
          />
          <div className="register-wrapper">
            <div className="or-copy">
              or
            </div>
            <Link to="/admin/register">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
LoginPage.propTypes = {
  credentials: PropTypes.object.isRequired,
  user: PropTypes.object,
  actions: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  company:PropTypes.object.isRequired,
  networkError: PropTypes.bool
};
LoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let credentials = {
    username: '',
    password: ''
  };
  return {
    credentials: credentials,
    user: state.auth.currentUser,
    lab: state.auth.lab,
    company: state.auth.company,
    networkError: state.ajaxCallsInProgress.networkError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
