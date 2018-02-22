import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as companyActions from '../../../actions/companyActions';
import DashboardHeader from '../../common/DashboardHeader';
import UserForm from './UserForm';
import toastr from 'toastr';
import _ from 'lodash';
import LoadingSpinner from '../../common/LoadingSpinner';

class ManageUserPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, this.props.user),
      errors: {},
      saving: false
    };
    this.updateUser = this.updateUser.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.user._id != nextProps.user._id) {
      this.setState({
        user: nextProps.user
      });
    }
  }
  updateUser(event) {
    const field = event.target.name;

    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }
  validateForm() {
    const errors = {};
		let formIsValid = true;

    this.setState({errors: errors});
		const user = this.state.user;

		if (_.isEmpty(user.first_name)) {
			errors.first_name = 'First Name is required.';
		}
    if (_.isEmpty(user.last_name)) {
      errors.last_name = 'Last Name is required.';
      formIsValid = false;
    }
    if (_.isEmpty(user.email_address)) {
      errors.email_address = 'Email Address is required.';
      formIsValid = false;
    }

		this.setState({errors: errors});
		return formIsValid;
	}
  saveUser(event) {
    event.preventDefault();

    if (!this.validateForm()) {
			return;
		}
    this.setState({saving: true});

    this.props.actions.saveUser(this.props.company._id, this.state.user)
      .then(() => {
        this.setState({saving: false});

        toastr.success('User Changes Saved');

        this.context.router.history.push(`/admin/profile`);
      })
      .catch(error => {
        toastr.error(error);

        this.setState({saving: false});
      });
  }
  render() {
    const dashboardTitle = (this.props.params.user_id) ? "Edit User" : "Add User";

    return (
      <div>
        <DashboardHeader
          dashboardTitle={dashboardTitle} />
        {!this.props.loading ?
          <UserForm
            user={this.state.user}
            errors={this.state.errors}
            saving={this.state.saving}
            onChange={this.updateUser}
            onSave={this.saveUser}
          />
          : <LoadingSpinner />
        }
      </div>
    );
  }
}

ManageUserPage.propTypes = {
  company: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageUserPage.contextTypes = {
  router: PropTypes.object
};
function getUserById(users, id) {
  const user = users.filter(user => user._id == id);

  if (user) {
    return user[0];
  }
  return null;
}
function mapStateToProps(state, ownProps) {
  const userId =  ownProps.match.params.user_id;
  let user = {
    first_name: "",
    last_name: "",
    email_address: "",
    mobile_number: "",
    enrolled_user: false
  };
  let loading = (userId) ? true : false;
  if (userId && state.companyUsers.length > 0) {
    user = getUserById(state.companyUsers, userId);
    loading = false;
  }
  return {
    company: state.auth.company,
    user: user,
    loading: loading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(companyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);
