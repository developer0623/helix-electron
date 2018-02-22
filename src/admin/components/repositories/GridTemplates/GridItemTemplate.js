import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const GridListItemTemplate = ({repository, onSelectClick, onDeleteButtonClick}) => {
  function onSelect(e) {
    onSelectClick(e, repository);
  }
  function onDelete(e) {
    onDeleteButtonClick(e, repository);
  }
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
      <Link to={`/admin/repositories/${repository._id}/entities`} className="item">
        <div className="well">
          <div onClick={onDelete} className="delete-button">
            <i className="icon-close icons" />
          </div>
          <i className="icons icon-folder item" />
          <h6>{repository.name}</h6>
        </div>
      </Link>
    </div>
  );
};

GridListItemTemplate.propTypes = {
  repository: PropTypes.object.isRequired,
  onSelectClick: React.PropTypes.func.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default GridListItemTemplate;
