import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as authActions from '../../actions/authActions';
import ResetPasswordForm from './ResetPasswordForm';
import toastr from 'toastr';
import _ from 'lodash';

class ResetPasswordPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      password: "",
      password_confirm: "",
      errors: {},
      saving: false
    };
    this.updatePasswordState = this.updatePasswordState.bind(this);
    this.updatePasswordConfirmState = this.updatePasswordConfirmState.bind(this);
    this.submitNewPassword = this.submitNewPassword.bind(this);
  }
  updatePasswordState(event) {
    let password = this.state.password;
    password = event.target.value;

    return this.setState({
      errors: {},
      password: password
    });
  }
  updatePasswordConfirmState(event) {
    let password = this.state.password_confirm;
    password = event.target.value;

    return this.setState({
      errors: {},
      password_confirm: password
    });
  }
  validateForm() {
    const errors = {};
    let formIsValid = true;

    this.setState({
      errors: errors
    });

    if (_.isEmpty(this.state.password)) {
      errors.password = 'Please specify a new password.';
      formIsValid = false;
    }
    if (formIsValid && !(this.state.password == this.state.password_confirm)) {
      errors.password_confirm = "The new password and the password confirmation don't match.";
      formIsValid = false;
    }

    this.setState({errors: errors});

    return formIsValid;
  }
  submitNewPassword(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    this.setState({
      saving: true
    });
    this.props.actions.resetPassword(this.props.params.link_id, this.state.password)
    .then(() =>
      this.redirect()
    )
    .catch(error => {
      const errors = {
        email_address: "Sorry, we couldn't find that email address"
      };

      this.setState({saving: false});
      this.setState({errors: errors});
    });
  }
  redirect() {
    this.setState({
      saving: false
    });

    toastr.success('Your password was reset.');

     this.props.history.push(`/admin/login`);
  }
  render() {
    return (
      <div className="auth-box">
        <h2>Please enter your new password.</h2>
        <div className="login-box">
          <ResetPasswordForm
            password={this.state.password}
            password_confirm={this.state.password_confirm}
            onChangePassword={this.updatePasswordState}
            onChangePasswordConfirm={this.updatePasswordConfirmState}
            onSubmit={this.submitNewPassword}
            saving={this.state.saving}
            errors={this.state.errors}
          />
        </div>
      </div>
    );
  }
}
ResetPasswordPage.propTypes = {
  actions: PropTypes.object.isRequired,
  params:PropTypes.object.isRequired
};
ResetPasswordPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
