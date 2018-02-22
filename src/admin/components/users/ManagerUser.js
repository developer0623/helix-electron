import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as authActions from '../../actions/authActions';
import DashboardHeader from '../common/DashboardHeader';
import UserForm from './UserForm';
import toastr from 'toastr';
import _ from 'lodash';
import LoadingSpinner from '../common/LoadingSpinner';

class ManagerUserPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, this.props.user),
      password: {
        current_password: "",
        new_password: "",
        new_password_again: ""
      },
      errors: {
        password: {}
      },
      saving: false
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.updatePasswordState = this.updatePasswordState.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.user._id != nextProps.user._id) {
      this.setState({user: Object.assign({}, nextProps.user)});
    }
  }
  updateUserState(event) {
    const field = event.target.name;

    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }
  validateForm() {
    const errors = {
      password: {}
    };
    let formIsValid = true;

    this.setState({
      errors: errors
    });
    const user = this.state.user;

    if (_.isEmpty(user.first_name)) {
      errors.first_name = 'First Name is required.';
    }
    if (_.isEmpty(user.last_name)) {
      errors.last_name = 'Last Name is required.';
      formIsValid = false;
    }
    if (_.isEmpty(user.email_address)) {
      errors.email_address = 'Email Address is required..';
      formIsValid = false;
    }
    // if (_.isEmpty(user.phone_number)) {
    //   errors.phone_number = 'Phone number is required..';
    //   formIsValid = false;
    // }

    this.setState({errors: errors});
    return formIsValid;
  }
  saveUser(event) {
    event.preventDefault();

    if (!this.validateForm()) {
			return;
		}
    this.setState({saving: true});

    this.props.actions.saveUser(this.state.user)
    .then(() => {
      this.setState({saving: false});

      toastr.success('User Profile Changes Saved');
    })
    .catch(error => {
      toastr.error(error);

      this.setState({saving: false});
    });
  }
  updatePasswordState(event) {
    event.preventDefault();

    const field = event.target.name;

    let password = this.state.password;
    password[field] = event.target.value;
    return this.setState({password: password});
  }
  validateChangePasswordForm() {
    const errors = {
      password: {}
    };
    let formIsValid = true;

    this.setState({
      errors: errors
    });
    const password = this.state.password;

    if (_.isEmpty(password.current_password)) {
      errors.password.current_password = 'Please enter your current password.';
    }
    if (_.isEmpty(password.new_password)) {
      errors.password.new_password = 'Please enter your new password.';
      formIsValid = false;
    }
    if (_.isEmpty(password.new_password_again)) {
      errors.password.new_password_again = 'Please enter your new password again.';
      formIsValid = false;
    }
    if (formIsValid && (password.new_password != password.new_password_again)) {
      errors.password.new_password_again = 'Your new password field do not match.  Please enter your new password again.';
      password.new_password_again = "";
      formIsValid = false;
    }

    this.setState({
      errors: errors,
      password: password
    });
    return formIsValid;
  }
  changePassword(event) {
    event.preventDefault();

    if (!this.validateChangePasswordForm()) {
      return;
    }
    this.setState({saving: true});

    this.props.actions.changePassword(this.state.password.current_password, this.state.password.new_password)
    .then(() => {
      this.setState({saving: false});

      toastr.success('Password Changed');
    })
    .catch(error => {
      toastr.error(error);

      this.setState({saving: false});
    });
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Your Profile" />
        {this.props.user._id ?
          <UserForm
            user={this.state.user}
            errors={this.state.errors}
            saving={this.state.saving}
            onChange={this.updateUserState}
            onSave={this.saveUser}
            password={this.state.password}
            onChangePassword={this.updatePasswordState}
            onSavePassword={this.changePassword}
          /> : <LoadingSpinner />
        }
      </div>
    );
  }
}

ManagerUserPage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManagerUserPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.currentUser
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerUserPage);
