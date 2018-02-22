import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router-dom';

const Filters = ({ applicationId }) => {
  return (
    <div>
      <div className="filter-nav mt-4 mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item active">
            <Link to={`/admin/applications/${applicationId}/reports/activities`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Activity</Link>
          </li>
          <li className="nav-item active">
            <Link to={`/admin/applications/${applicationId}/reports/intent_logs`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Intent Logs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Filters.propTypes = {
  applicationId: PropTypes.string.isRequired
};

export default Filters;
