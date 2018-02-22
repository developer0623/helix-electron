import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import usersApi from '../../../../api/systems/userApi';
import DashboardHeader from '../../common/DashboardHeader';
import SearchRepository from '../../common/SearchRepository';
import Filters from '../Filters';
import LoadingDots from '../../common/LoadingDots';
import UserList from './UserList';
import toastr from 'toastr';

class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      loading: false,
      users: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.redirectToAddUserPage = this.redirectToAddUserPage.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.pageUsers = this.pageUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });

    this.loadUsers();
  }
  redirectToAddUserPage() {
     this.props.history.push('/admin/system/user');
  }
  deleteUser(user, event) {
    event.preventDefault();
    this.setState({saving: true});

    usersApi.deleteUser(user)
    .then(() => toastr.success('User Deleted'))
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }
  pageUsers(data) {
    let selected = data.selected + 1;

    this.loadUsers(selected);
  }
  searchUsers(event) {
    let last_name = event.target.value;
    this.loadUsers(1, null, last_name);

    this.setState({search: last_name});
  }
  loadUsers(page, first_name, last_name) {
    usersApi.getAllUsers(page, first_name, last_name)
    .then(users => {
      this.setState({
        loading: false,
        users: users
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="Users"
        />
        <SearchRepository
          search={this.state.search}
          searchPlaceholder="Search User Name"
          searchButtonText="Add User"
          onSearchChange={this.searchUsers}
          onSearchButtonClick={this.redirectToAddUserPage}
        />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <UserList users={this.state.users.results}
          numberOfPages={this.state.users.max_pages}
          handlePageClick={this.pageUsers}
          onDeleteButtonClick={this.deleteUser} />}
      </div>
    );
  }
}

UsersPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
