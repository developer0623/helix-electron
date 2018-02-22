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
import toastr from 'toastr';

import * as applicationActions from '../../../actions/labs/applicationActions';

class ApplicationHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.certifyClicked = this.certifyClicked.bind(this);
    this.onCloseClicked = this.closeClicked.bind(this);
  }
  certifyClicked(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.applicationActions.submitApplication(this.props.lab._id, this.props.application)
      .then(() => {
        toastr.success("Application Submitted");

        this.setState({saving: false});
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  closeClicked(event) {
    event.preventDefault();

     this.props.history.push(`/admin/applications`);
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
          {this.props.application.name}
        </a>
        <div className="collapse navbar-collapse mr-auto justify-content-end" id="navbarResponsive">
          <ul className="nav navbar-nav" style={{'marginLeft': '60px'}}>
            <li className="nav-item">
              <Link to={`/admin/applications/${this.props.application._id}/activity`}  className={getClassName('activity')}>Activity</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/applications/${this.props.application._id}/inventories`} className={getClassName('inventories')}>Configuration</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/applications/${this.props.application._id}/`}  className={getClassName('notes')}>Notes</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/applications/${this.props.application._id}/`}  className={getClassName('ordering')}>Ordering</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/applications/${this.props.application._id}/`}  className={getClassName('quick_actions')}>Quick Actions</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/labs/repositories`}  className={getClassName('repositories')}>Repositories</Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/labs/settings`}  className={getClassName('settings')}>Settings</Link>
            </li>
            <li className="nav-item-highlight">
              <button type="button" className="btn btn-pill btn-secondary" onClick={this.certifyClicked}>
                 Submit for Certification
              </button>
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

ApplicationHeader.propTypes = {
  user: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  applicationActions:PropTypes.object.isRequired
};

ApplicationHeader.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.currentUser,
    company: state.auth.company,
    lab: state.auth.lab,
    application: state.auth.application
  };
}
function getRepositoryById(repositories, id) {
  const repository = repositories.filter(repository => repository._id == id);
  if (repository) return repository[0];
  return null;
}
function mapDispatchToProps(dispatch) {
  return {
    applicationActions: bindActionCreators(applicationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationHeader);
