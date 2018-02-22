import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const RepositoryTypeItem = ({repositoryType, selectRepositoryType}) => {
  function onSelectRepositoryType(e) {
    selectRepositoryType(e, repositoryType);
  }
  return (
    <div className="step-select-option" onClick={onSelectRepositoryType}>
      <p>{repositoryType.type_name}</p>
    </div>
  );
};

RepositoryTypeItem.propTypes = {
  repositoryType: PropTypes.object.isRequired,
  selectRepositoryType: PropTypes.func.isRequired
};

export default RepositoryTypeItem;
