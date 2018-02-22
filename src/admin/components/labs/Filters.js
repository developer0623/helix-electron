import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router-dom';

const Filters = () => {
  return (
    <div>
      <div className="filter-nav mt-4 mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to={`/admin/labs/settings`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Lab Setup</Link>
          </li>
          <li className="nav-item">
            <Link to={`/admin/labs/lab_members`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Lab Members</Link>
          </li>
          <li className="nav-item">
            <Link to={`/admin/labs/vendors`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Vendors</Link>
          </li>
          <li className="nav-item">
            <Link to={`/admin/labs/membership_orgs`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Membership Organizations</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Filters.propTypes = {};

export default Filters;
