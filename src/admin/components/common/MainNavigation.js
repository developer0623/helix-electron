import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router-dom';

const MainNavigation = ({user, logoutClicked, loginWithAmazon}) => {
  const renderIf = predicate => element => predicate && element;

  const isAdmin = renderIf(user.user_type == 'Admin');
  const isCustomer = renderIf(user.user_type != 'Admin');

  return (
    <nav className="navbar navbar-toggleable-sm fixed-top navbar-inverse bg-inverse app-navbar">
      <button className="navbar-toggler navbar-toggler-right hidden-md-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <a className="navbar-brand" href="../index.html">
        <span className="icon icon-menu navbar-brand-icon"></span>
        Helix
      </a>

      {isAdmin(
      <div className="collapse navbar-collapse mr-auto" id="navbarResponsive">
        <ul className="nav navbar-nav" style={{'marginLeft': '60px'}}>
          <li className="nav-item">
            <Link to="/admin/overview" name="Devices" className="nav-link" activeClassName="active">Overview</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/intent_logs" name="Logs" className="nav-link" activeClassName="active">Logs</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/companies" className="nav-link" activeClassName="active">Companies</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/users" name="Security" className="nav-link" activeClassName="active">Security</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/intents" name="Setup" className="nav-link" activeClassName="active">Setup</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/calculations" name="Content" className="nav-link" activeClassName="active">Content</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/builds" className="nav-link" activeClassName="active">Builds</Link>
          </li>
        </ul>
      </div>)}
      {isCustomer(
      <div className="collapse navbar-collapse mr-auto" id="navbarResponsive">
        <ul className="nav navbar-nav" style={{'marginLeft': '60px'}}>
          <li className="nav-item">
            <Link to="/admin/overview" name="Skills" className="nav-link" activeClassName="active">Activity</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/lab" name="Lab" className="nav-link" activeClassName="active">My Lab</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/inventory" name="Inventory" className="nav-link" activeClassName="active">Inventory</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/notes" name="Notes" className="nav-link" activeClassName="active">Notes</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/calculations" name="Skills" className="nav-link" activeClassName="active">Skills</Link>
          </li>
        </ul>
      </div>)}
      <div className="user-info mr-20">
        <div className="flextable">
          <div className="flextable-item flextable-primary">
            {user.name}
            {'  |  '}
            <a href="#" onClick={logoutClicked}>Logout</a>
            <a href="#" onClick={loginWithAmazon}>Login to Amazon</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

MainNavigation.propTypes = {
  user: PropTypes.object.isRequired,
  logoutClicked: PropTypes.func.isRequired,
  loginWithAmazon:  PropTypes.func.isRequired
};

export default MainNavigation;
