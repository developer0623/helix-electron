import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const LaboratoryProfilesEmptyState = () => {
  return (
    <div className="emptyState">
      No laboratory profiles for your organization have been created.
    </div>
  );
};

export default LaboratoryProfilesEmptyState;
