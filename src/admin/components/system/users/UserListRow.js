import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const UserListRow = ({user, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(user, e);
  }
  return (
    <tr>
      <td><Link to={`/admin/system/users/${user._id}`}>{user.email_address}</Link></td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.user_type}</td>
      <td>{(user.company) ? user.company.name : ""}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

UserListRow.propTypes = {
  user: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default UserListRow;
