import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as companyActions from '../../../actions/companyActions';
import DashboardHeader from '../../common/DashboardHeader';
import LoadingDots from '../../common/LoadingDots';
import UserList from './UserList';
import AddItemTemplate from './AddItemTemplate';
import toastr from 'toastr';
import LoadingSpinner from '../../common/LoadingSpinner';

class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      loading: false
    };
    this.redirectToAddUserPage = this.redirectToAddUserPage.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.company._id != nextProps.company._id) {
      this.setState({
        company: nextProps.company
      });
    }
  }
  redirectToAddUserPage() {
    this.props.history.push(`/admin/organization/users/new`);
  }
  deleteUser(user, event) {
    event.preventDefault();
    this.setState({saving: true});

    this.props.actions.deleteUser(this.props.company._id, user)
    .then(() => {
      toastr.success('User Deleted');
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
          dashboardTitle="Users"
          AddItemTemplate={AddItemTemplate}
          onButtonClick={this.redirectToAddUserPage}
        />
      {/* this.state.loading && <LoadingDots interval={100} dots={20} /> */}
        {this.props.users.length
          ?
            <UserList
              users={this.props.users}
              onDeleteButtonClick={this.deleteUser}
            />
          : <LoadingSpinner />
        }
      </div>
    );
  }
}

UsersPage.propTypes = {
  company: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    users: state.companyUsers,
    actions: PropTypes.object.isRequired
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(companyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
