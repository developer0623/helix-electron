import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const UsersEmptyState = () => {
  return (
    <div className="emptyState">
      No Users have been created.
    </div>
  );
};

export default UsersEmptyState;
