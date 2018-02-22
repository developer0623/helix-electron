import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router-dom';

const Filters = () => {
  return (
    <div>
      <div className="filter-nav mt-4 mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item active">
            <Link to="/admin/system/access_tokens" className="btn btn-pill btn-primary mr-1" activeClassName="active">Access Tokens</Link>
          </li>
          <li className="nav-item active">
            <Link to="/admin/system/applications" className="btn btn-pill btn-primary mr-1" activeClassName="active">Applications</Link>
          </li>
          <li className="nav-item active">
            <Link to="/admin/system/system_attributes" className="btn btn-pill btn-primary mr-1" activeClassName="active">Attributes</Link>
          </li>
          <li className="nav-item active">
            <Link to="/admin/system/clients" className="btn btn-pill btn-primary mr-1" activeClassName="active">Clients</Link>
          </li>
          <li className="nav-item active">
            <Link to="/admin/system/companies" className="btn btn-pill btn-primary mr-1" activeClassName="active">Companies</Link>
          </li>
          <li className="nav-item active">
            <Link to="/admin/system/custom_slot_types" className="btn btn-pill btn-primary mr-1" activeClassName="active">Custom Slot Types</Link>
          </li>
          <li className="nav-item active">
            <Link to="/admin/system/intents" className="btn btn-pill btn-primary mr-1" activeClassName="active">Intents</Link>
          </li>
          <li className="nav-item active">
            <Link to="/admin/system/repository_types" className="btn btn-pill btn-primary mr-1" activeClassName="active">Repository Types</Link>
          </li>
          <li className="nav-item active">
            <Link to="/admin/system/users" className="btn btn-pill btn-primary mr-1" activeClassName="active">Users</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Filters.propTypes = {
};

export default Filters;
