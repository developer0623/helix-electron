import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const ClientsEmptyState = () => {
  return (
    <div className="emptyState">
      No Clients have been created.
    </div>
  );
};

export default ClientsEmptyState;
