import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import ForgotPasswordForm from './ForgotPasswordForm';
import toastr from 'toastr';
import _ from 'lodash';
import {Link} from 'react-router-dom';

class ForgotPasswordPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email_address: "",
      errors: {},
      saving: false
    };
    this.updateEmailAddressState = this.updateEmailAddressState.bind(this);
    this.submitEmailAddress = this.submitEmailAddress.bind(this);
  }
  updateEmailAddressState(event) {
    let email_address = this.state.email_address;
    email_address = event.target.value;

    return this.setState({
      errors: {},
      email_address: email_address
    });
  }
  submitEmailAddress(event) {
    event.preventDefault();

    this.setState({
      saving: true
    });
    this.props.actions.forgotPassword(this.state.email_address)
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

    toastr.success('A password reset link has been sent.');
  }
  render() {
    return (
      <div className="auth-box">
        <h2>Forgot your password?</h2>
        <div className="login-box">
          <ForgotPasswordForm
            email_address={this.state.email_address}
            onChange={this.updateEmailAddressState}
            onSubmit={this.submitEmailAddress}
            saving={this.state.saving}
            errors={this.state.errors}
          />
        </div>
      </div>
    );
  }
}
ForgotPasswordPage.propTypes = {
  actions: PropTypes.object.isRequired
};
ForgotPasswordPage.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
