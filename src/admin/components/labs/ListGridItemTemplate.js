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
    <div className="col-xs-4 col-md-3 col-lg-3">
      <Link to={`/admin/labs/${repository._id}/settings`} className="item">
        <div className="well">
          <div onClick={onDelete} className="delete-button">
            <i className="icon-close icons" />
          </div>
          <i className="icon-home icons item" />
          <h6>{repository.lab_name}</h6>
        </div>
      </Link>
    </div>
  );
};

GridListItemTemplate.propTypes = {
  repository: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  onSelectClick: React.PropTypes.func.isRequired
};

export default GridListItemTemplate;
