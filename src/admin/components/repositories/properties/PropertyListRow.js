import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const PropertyListRow = ({repository, property, onDeleteButtonClick, onEditButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(e, property);
  }
  function onEdit(e) {
    onEditButtonClick(e, property);
  }
  return (
    <div className="row">
      <div className="col-md-12 pl-0 pr-0">
        <div className="container">
          <div className="row">
            <div className="col-md-1 pl-0 pr-0 text-center" style={{'margin': 'auto'}}>
              <i className="icons icon-close delete-button" onClick={onDelete} />
            </div>
            <div className="col-md-10 pl-0 pr-0">
              {property.name}
            </div>
            <div className="col-md-1 pl-0 pr-0" style={{'margin': 'auto'}}>
              <i className="icons icon-pencil" onClick={onEdit} />
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

PropertyListRow.propTypes = {
  repository: PropTypes.object.isRequired,
  property: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  onEditButtonClick: React.PropTypes.func.isRequired
};

export default PropertyListRow;
