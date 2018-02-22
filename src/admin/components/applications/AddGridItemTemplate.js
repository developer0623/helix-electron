import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const AddGridItemTemplate = () => {
  return (
    <div className="col-xs-4 col-md-3 col-lg-3">
      <Link to={`/admin/applications/new`} className="add-item">
        <div className="well">
          <i className="icons icon-plus add-item" />
          <h6>Setup a New Virtual Assistant</h6>
        </div>
      </Link>
    </div>
  );
};

AddGridItemTemplate.propTypes = {};

export default AddGridItemTemplate;
