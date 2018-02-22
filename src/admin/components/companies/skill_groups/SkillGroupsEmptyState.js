import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const SkillGroupsEmptyState = () => {
  return (
    <div className="emptyState">
      No skill group for your organization have been defined.
    </div>
  );
};

export default SkillGroupsEmptyState;
