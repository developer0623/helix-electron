import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const AccessTokensEmptyState = () => {
  return (
    <div className="emptyState">
      No Access Tokens have been created.
    </div>
  );
};

export default AccessTokensEmptyState;
