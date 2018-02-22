import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import ApplicationDropdown from './ApplicationDropDown';
import CompanyDropdown from './CompanyDropDown';
import AddCompanyButton from './AddCompanyButton';
import AddApplicationButton from './AddApplicationButton';
import MainMenuDropDown from './MainMenuDropDown';
import _ from 'lodash';

import * as applicationActions from '../../../actions/labs/applicationActions';

class LabHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToApplicationPage = this.redirectToApplicationPage.bind(this);
    this.redirectToNewApplicationPage = this.redirectToNewApplicationPage.bind(this);
    this.onCloseClicked = this.closeClicked.bind(this);
  }
  redirectToApplicationPage(event) {
    event.preventDefault();

     this.props.history.push(`/admin/labs/applications/settings`);
  }
  redirectToNewApplicationPage(event) {
    event.preventDefault();

     this.props.history.push(`/admin/labs/applications/new`);
  }
  closeClicked(event) {
    event.preventDefault();

     this.props.history.push(`/admin/labs`);
  }
  render() {
    function getClassName(path, other) {
      let className = `nav-link menu-item`;
      if(other) {
        className = `${className} ${other}`;
      }

      if(location.pathname.indexOf(path) > 0) {
        className = `${className} active`;
      }

      return className;
    }
    return (
      <nav className="navbar navbar-toggleable-sm fixed-top navbar-inverse bg-inverse app-navbar">
        <button className="navbar-toggler navbar-toggler-right hidden-md-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <a className="navbar-brand" href="../index.html">
          {this.props.lab.lab_name}
        </a>
        <div className="collapse navbar-collapse mr-auto justify-content-end" id="navbarResponsive">
          <ul className="nav navbar-nav" style={{'marginLeft': '60px'}}>
            <li className="nav-item">
              <Link to={`/admin/labs/activity`}  className={getClassName('activity')}>Activity</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/labs/inventories`} className={getClassName('inventories')}>Inventories</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/labs/notes`}  className={getClassName('notes')}>Notes</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/labs/ordering`}  className={getClassName('ordering')}>Ordering</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/labs/quick_actions`}  className={getClassName('quick_actions')}>Quick Actions</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/labs/repositories`}  className={getClassName('repositories')}>Repositories</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/labs/settings`}  className={getClassName('settings')}>Settings</Link>
            </li>
            <li className="nav-item-highlight">
              {this.props.lab.application && <button type="button" className="btn btn-pill btn-secondary" onClick={this.redirectToApplicationPage}>
                 Virtual Assistant
              </button>}
              {!this.props.lab.application && <button type="button" className="btn btn-pill btn-secondary" onClick={this.redirectToNewApplicationPage}>
                 Setup Virtual Assistant
              </button>}
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse user-info mr-20" style={{'width': 'auto'}}  onClick={this.onCloseClicked}>
          <div className="nav-settings-cog">
            <i className="icons icon-close" />
          </div>
        </div>
      </nav>
    );
  }
}

LabHeader.propTypes = {
  user: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired
};

LabHeader.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.currentUser,
    company: state.auth.company,
    lab: state.auth.lab
  };
}
function getRepositoryById(repositories, id) {
  const repository = repositories.filter(repository => repository._id == id);
  if (repository) return repository[0];
  return null;
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LabHeader);
