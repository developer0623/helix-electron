import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const LabRow = ({lab}) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
      <Link to={`/admin/labs/${lab._id}/settings`} className="item">
        <div className="well">
          <i className="icons icon-folder item" />
          <h6>{lab.lab_name}</h6>
        </div>
      </Link>
    </div>
  );
};

LabRow.propTypes = {
  lab: PropTypes.object.isRequired
};

export default LabRow;
