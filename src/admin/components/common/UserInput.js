import React, {PropTypes} from 'react';

const UserInput = ({user, onEditClick, onDeleteClick}) => {
  function onEditUserClick(event) {
    onEditClick(event, user);
  }
  function onDeleteUserClick(event) {
    onDeleteClick(event, user);
  }
  return (
    <div className="row user-row">
      <div className="col-md-4">
        {user.first_name} {user.last_name}
      </div>
      <div className="col-md-5">
        {user.email_address} | {user.phone_number}
      </div>
      <div className="col-md-3 text-right">
        <a href="#" onClick={onEditUserClick} className="user-edit">
          <span className="icons icon-pencil"></span>
        </a>
        <a href="#" onClick={onDeleteUserClick} className="user-delete">
          <span className="icons icon-close"></span>
        </a>
      </div>
    </div>
  );
};

UserInput.propTypes = {
  user: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default UserInput;
