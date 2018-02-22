import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const RepositoryTypeEmptyState = () => {
  return (
    <div className="emptyState">
      No repository types have been created.
    </div>
  );
};

export default RepositoryTypeEmptyState;
