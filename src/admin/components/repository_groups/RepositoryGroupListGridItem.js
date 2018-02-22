import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const RepositoryGroupListGridItemTemplate = ({repositoryGroup, onSelectClick}) => {
  function onSelect(e) {
    onSelectClick(e, repositoryGroup);
  }
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
      <Link to={`/admin/repositories/${repositoryGroup._id}`} className="item">
        <div className="well">
          <i className="icons icon-folder item" />
          <h6>{repositoryGroup.group_name}</h6>
        </div>
      </Link>
    </div>
  );
};

RepositoryGroupListGridItemTemplate.propTypes = {
  repositoryGroup: PropTypes.object.isRequired,
  onSelectClick: React.PropTypes.func
};

export default RepositoryGroupListGridItemTemplate;
