import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import RegisterForm from './RegisterForm';
import toastr from 'toastr';
import _ from 'lodash';
import {Link} from 'react-router-dom';

class RegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: this.props.user,
      hasError: false,
      error: {},
      errors: {},
      saving: false
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.registerClicked = this.registerClicked.bind(this);
  }
  updateUserState(event) {
    event.preventDefault();

    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;

    return this.setState({user: user});
  }
  registerClicked(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.registerUser(this.state.user)
    .then(() =>
      this.redirect()
    )
    .catch(error => {
      this.setState({saving:false, hasError: true, error: "Invalid email address and password."});
    });
  }
  redirect() {
    this.setState({saving: false});

    toastr.success('Successfully Registered');

    switch(this.props.user.user_type) {
      case "Administrator":
        this.context.router.history.push(`/admin/applications`);

        break;
      case "Organization":
        // this.context.router.history.push(`/admin/labs`);
        this.context.router.history.push(`/admin/onboard`);

        break;
      default:
        if(this.props.user.lab) {
          this.context.router.history.push(`/admin/labs/repositories`);
        } else {
          this.context.router.history.push(`/admin/labs/setup`);
        }
    }
  }
  render() {
    return (
      <div className="auth-box">
        <h2>Get Started With HelixAI</h2>
        <div className="login-box">
          <RegisterForm
            user={this.state.user}
            onChange={this.updateUserState}
            onRegister={this.registerClicked}
            saving={this.state.saving}
            errors={this.state.errors}
            hasError={this.state.hasError}
            error={this.state.error}
          />
          <div className="register-wrapper">
            <div className="or-copy">
              or
            </div>
            <Link to="/admin/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
RegisterPage.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object.isRequired
};
RegisterPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let user = {
    user_type: 'Organization',
    first_name: '',
    last_name: '',
    email_address: '',
    password: ''
  };
  return {
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
