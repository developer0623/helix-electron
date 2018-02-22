import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const GridListItemTemplate = ({repository, onSelectClick, onDeleteButtonClick}) => {
  function onSelect(e) {
    onSelectClick(e, repository);
  }
  function onDelete(e) {
    onDeleteButtonClick(repository, e);
  }
  return (
    <div className="col-xs-4 col-md-3 col-lg-3">
      <Link to={`/admin/applications/${repository._id}/settings`} className="item">
        <div className="well">
          <div onClick={onDelete} className="delete-button">
            <i className="icon-close icons" />
          </div>
          <i className="icons icon-bubble item" />
          <h6>{repository.name}</h6>
        </div>
      </Link>
    </div>
  );
};

GridListItemTemplate.propTypes = {
  repository: PropTypes.object.isRequired,
  onSelectRepository: React.PropTypes.func,
  onDeleteButtonClick: React.PropTypes.func,
  onSelectClick: React.PropTypes.func
};

export default GridListItemTemplate;
