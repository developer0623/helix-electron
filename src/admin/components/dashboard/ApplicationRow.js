import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const ApplicationRow = ({application}) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
      <Link to={`/admin/applications/${application._id}/settings`} className="item">
        <div className="well">
          <i className="icons icon-folder item" />
          <h6>{application.name}</h6>
        </div>
      </Link>
    </div>
  );
};

ApplicationRow.propTypes = {
  application: PropTypes.object.isRequired
};

export default ApplicationRow;
