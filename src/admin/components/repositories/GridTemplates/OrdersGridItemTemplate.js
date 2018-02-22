import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const GridItemTemplate = ({repository, onSelectClick}) => {
  function onSelect(e) {
    onSelectClick(e, repository);
  }
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
      <Link to={`/admin/ordering/${repository._id}/entities`} className="item">
        <div className="well">
          <i className="icons icon-folder item" />
          <h6>{repository.name}</h6>
        </div>
      </Link>
    </div>
  );
};

GridItemTemplate.propTypes = {
  repository: PropTypes.object.isRequired,
  onSelectClick: React.PropTypes.func.isRequired
};

export default GridItemTemplate;
