import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import usersApi from '../../../../api/systems/userApi';
import DashboardHeader from '../../common/DashboardHeader';
import LoadingDots from '../../common/LoadingDots';
import Filters from '../Filters';
import UserList from './UserList';
import EditUserForm from './EditUserForm';
import toastr from 'toastr';

class EditUserPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, this.props.user),
      errors: {},
      saving: false
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }
  componentWillMount() {
    if(this.props.params.id) {
      this.setState({ loading: true });

      this.loadUser(this.props.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.user._id != nextProps.user._id) {
      this.setState({User: Object.assign({}, nextProps.user)});
    }
  }
  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }
  loadUser(user_id) {
    usersApi.getUser(user_id)
    .then(user => {
      this.setState({
        loading: false,
        user: user
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  saveUser(event) {
    event.preventDefault();
    this.setState({saving: true});
    usersApi.saveUser(this.state.user)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('User Saved');
    this.context.router.history.push('/admin/system/users');
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="Users" />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <EditUserForm
          user={this.state.user}
          companies={this.props.companies}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateUserState}
          onSave={this.saveUser}
        />}
      </div>
    );
  }
}

EditUserPage.propTypes = {
  user: PropTypes.object.isRequired,
  companies: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired
};

EditUserPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const userId =  ownProps.match.params.id;
  let user = {
    email_address: '',
    password: ''
  };
  return {
    user: user,
    companies: state.allCompanies
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);
