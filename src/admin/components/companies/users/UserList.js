import React, {PropTypes} from 'react';
import UserListRow from './UserListRow';
import UsersEmptyState from './UsersEmptyState';

const UserList = ({users, onDeleteButtonClick}) => {
  if (users.length == 0) {
    return (
      <UsersEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
        <tr>
          <th className="header">Email Address</th>
          <th className="header">First Name</th>
          <th className="header">Last Name</th>
          <th className="header">Enrolled User</th>
          <th className="header">Last Logged In</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {users.map(user =>
          <UserListRow
            key={user._id}
            user={user}
            onDeleteButtonClick={onDeleteButtonClick} />
        )}
        </tbody>
      </table>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default UserList;
