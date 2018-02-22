import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router-dom';

const Filters = ({ company, lab }) => {
  return (
    <div>
      <div className="filter-nav mt-4 mb-4">
        <div className="flextable">
          <div className="flextable-item">
            <ul className="nav nav-pills">
              <li className="nav-item active">
                <Link to={`/admin/labs/applications/settings`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Configuration</Link>
              </li>
              <li className="nav-item active">
                <Link to={`/admin/applications/settings/access_control`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Access Control</Link>
              </li>
              <li className="nav-item active">
                <Link to={`/admin/applications/settings/beta`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Beta Testing</Link>
              </li>
            </ul>
          </div>
          <div className="flextable-item flextable-primary" style={{'paddingRight': '20px', 'textAlign': 'right'}}>
            <Link to={`/admin/applications/settings/advanced`} className="btn btn-pill btn-secondary" activeClassName="active">Advanced</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired
};

export default Filters;
