import React from 'react';
import { Link, IndexLink } from 'react-router';

const Sidebar = () => {
  return (
    <nav className="sidebar-nav">
      <div className="sidebar-header">
        <button className="nav-toggler nav-toggler-md sidebar-toggler" type="button" data-toggle="collapse" data-target="#nav-toggleable-md">
          <span className="sr-only">Toggle nav</span>
        </button>
        <a className="sidebar-brand img-responsive" href="../index.html">
          <img src={require('../../../images/helix.png')} />
        </a>
      </div>
      <div className="collapse nav-toggleable-md" id="nav-toggleable-md">
        <ul className="nav nav-pills nav-stacked flex-column">
          <li className="nav-header">Dashboards</li>
          <li className="nav-item">
            <Link to="/admin/overview" name="Overview" className="nav-link" activeClassName="active">Overview</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/calculations" name="Calculations" className="nav-link" activeClassName="active">Calculations</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/protocols" name="Protocols" className="nav-link" activeClassName="active">Protocols</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/recipes" name="Recipes" className="nav-link" activeClassName="active">Recipes</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/users" name="Users" className="nav-link" activeClassName="active">Users</Link>
          </li>

          <li className="nav-header">OAuth</li>
          <li className="nav-item">
            <Link to="/admin/access_tokens" name="Access Tokens" className="nav-link" activeClassName="active">Access Tokens</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/clients" name="Clients" className="nav-link" activeClassName="active">Clients</Link>
          </li>
        </ul>
        <hr className="visible-xs mt-3" />
      </div>
    </nav>
  );
};

export default Sidebar;
