import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const LogsEmptyState = () => {
  return (
    <div className="emptyState">
      No builds have been created.
    </div>
  );
};

export default LogsEmptyState;
