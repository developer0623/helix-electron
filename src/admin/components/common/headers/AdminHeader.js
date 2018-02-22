import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ApplicationDropdown from './ApplicationDropDown';
import CompanyDropdown from './CompanyDropDown';
import AddCompanyButton from './AddCompanyButton';
import AddApplicationButton from './AddApplicationButton';
import MainMenuDropDown from './MainMenuDropDown';
import * as authActions from '../../../actions/authActions';
import _ from 'lodash';
import toastr from 'toastr';
import './AdminHeader.css';

class AdminHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isApplicationMenuOpen: true,
      showApplicationDropDown: false
    };
    this.setupLabClicked = this.setupLabClicked.bind(this);
    this.labsClicked = this.labsClicked.bind(this);
    this.logoutClicked = this.logoutClicked.bind(this);
    this.applicationTriggerClicked = this.applicationTriggerClicked.bind(this);
    this.applicationChangedClicked = this.applicationChangedClicked.bind(this);
    this.companyChangedClicked = this.companyChangedClicked.bind(this);
    this.createApplicationClicked = this.createApplicationClicked.bind(this);
    this.createCompanyClicked = this.createCompanyClicked.bind(this);
  }

  logoutClicked(event) {
    event.preventDefault();

    this.props.actions.logoutUser();
    this.redirect();
  }
  applicationTriggerClicked(event) {
    event.preventDefault();

    this.setState({showApplicationDropDown: !this.state.showApplicationDropDown});
  }
  applicationChangedClicked(event, lab) {
    event.preventDefault();

    this.props.actions.setSelectedLab(lab)
    .then(() => {
      toastr.success(`Changed Lab to ${lab.lab_name}`);

      this.setState({showApplicationDropDown: false});

      this.context.router.history.push(`/admin/labs/${lab._id}/lab_setup`);
    })
    .catch((err) => {
      toastr.error(err);
    });
  }
  companyChangedClicked(company, event) {
    event.preventDefault();

    this.setState({saving: true});
    sessionStorage.setItem("companyId", company._id);

    this.props.actions.changeSelectedCompany(company)
    .then(() => {
      toastr.success(`Changed Company to ${company.name}`);

      this.setState({showApplicationDropDown: false});

      this.context.router.history.push(`/admin/applications`);
    })
    .catch((err) => {
      toastr.error(err);
    });
  }
  createApplicationClicked(event) {
    this.refs.modal.show();
  }
  createCompanyClicked(event) {
    this.refs.createCompanyModal.show();
  }
  labsClicked(event) {
    event.preventDefault();

    this.context.router.history.push(`/admin/labs`);
  }
  setupLabClicked(event) {
    this.context.router.history.push(`/admin/labs/setup`);
  }
  redirect() {
    toastr.success('Successfully Logged Out');
    this.context.router.history.push('/admin/login');
  }
  render() {
    function getClassName(path, other) {
      let className = `nav-item`;
      if(other) {
        className = `${className} ${other}`;
      }

      if(location.pathname.indexOf(path) > 0) {
        className = `${className} active`;
      }

      return className;
    }
    const applicationMenuOptions = {
      isOpen: this.state.isApplicationMenuOpen,
      close: this.closeApplicationMenu
    };
    return (
      <div className="fixed-top">
        <nav className="navbar navbar-toggleable-sm navbar-inverse bg-inverse app-navbar">
          <div className="navbar-header">
            <button className="navbar-toggler navbar-toggler-right hidden-md-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {this.props.user.user_type == "Administrator" &&
            <a className="navbar-brand" href="../index.html">
              <i className="icon-menu icons mr-2"></i>
              Administrator
            </a>}
            {this.props.user.user_type == "Organization" &&
            <a className="navbar-brand" href="../index.html">
              <i className="icon-menu icons mr-2"></i>
              HelixAI
            </a>}
            {this.props.user.user_type == "Customer" &&
            <a className="navbar-brand" href="../index.html">
              <i className="icon-menu icons mr-2"></i>
              HelixAI
            </a>}
          </div>
          <div className="collapse navbar-collapse nav-toggleable-md justify-content-end" id="navbarResponsive">
           {(this.props.user.user_type == "Customer" && this.props.user.lab) &&
            <div>
               <ul className="nav navbar-nav">
                 <li className={getClassName('dashboard')}>
                   <i className="icon-home icons mr-2"></i>
                   <Link to={`/admin/dashboard`} className="nav-link menu-item">Dashboard</Link>
                 </li>
                 <li className={getClassName('activity')}>
                   <i className="icon-home icons mr-2"></i>
                   <Link to={`/admin/labs/activity`} className="nav-link menu-item">Activity</Link>
                 </li>
                 <li className={getClassName('inventories')}>
                   <i className="icon-grid icons mr-2"></i>
                   <Link to={`/admin/labs/inventories`} className="nav-link menu-item">Inventories</Link>
                 </li>
                 <li className={getClassName('notes')}>
                   <i className="icon-home icons mr-2"></i>
                   <Link to={`/admin/labs/notes`} className="nav-link menu-item">Note Taking</Link>
                 </li>
                 <li className={getClassName('ordering')}>
                   <i className="icon-chemistry icons mr-2"></i>
                   <Link to={`/admin/labs/ordering`} className="nav-link menu-item">Order Requests</Link>
                 </li>
                 <li className={getClassName('quick_actions')}>
                   <i className="icon-action-redo icons mr-2"></i>
                   <Link to={`/admin/labs/quick_actions`} className="nav-link menu-item">Quick Actions</Link>
                 </li>
                 <li className={getClassName('repositories')}>
                   <i className="icon-folder icons mr-2"></i>
                   <Link to={`/admin/labs/repositories`} className="nav-link menu-item">Repositories</Link>
                 </li>
                 <li className={getClassName('organization')}>
                   <i className="icon-settings icons mr-2"></i>
                   <Link to={`/admin/labs/settings`} className="nav-link menu-item">Settings</Link>
                 </li>
                 <li className="nav-item-highlight">
                   <button type="button" className="btn btn-pill btn-secondary">
                      <Link to={`/admin/labs`}>My Virtual Assistant</Link>
                   </button>
                 </li>
               </ul>
             </div>
           }
           {(this.props.user.user_type == "Customer" && !this.props.user.lab) &&
             <button type="button" className="btn btn-pill btn-secondary btn-setup" onClick={this.setupLabClicke}>
              Setup Your Lab
             </button>
           }
           {this.props.user.user_type == "Administrator" &&
            <div className="admin-header__mainnav">
               <ul className="nav navbar-nav">
                 <li className="admin-header__mainnav-item">
                   <i className="icon-home icons mr-2"></i>
                   <Link to={`/admin/dashboard`}  className={getClassName('dashboard')}>Dashboard</Link>
                 </li>
                 <li className="nav-item">
                   <i className="icon-home icons mr-2"></i>
                   <Link to={`/admin/system/applications`} className={getClassName('applications', 'first')}>Applications</Link>
                 </li>

                 <li className="nav-item">
                   <i className="icon-organization icons mr-2"></i>
                   <Link to={`/admin/system/companies`} className={getClassName('companies')}>Organizations</Link>
                 </li>
                 <li className="nav-item">
                   <i className="icon-home icons mr-2"></i>
                   <Link to={`/admin/system/labs`}  className={getClassName('labs')}>Labs</Link>
                 </li>
                 <li className="nav-item">
                   <i className="icon-key icons mr-2"></i>
                   <Link to={`/admin/system/users`}  className={getClassName('repositories')}>Security</Link>
                 </li>
                 <li className="nav-item">
                   <i className="icon-home icons mr-2"></i>
                   <Link to={`/admin/system/intents`}  className={getClassName('reports')}>Intent Management</Link>
                 </li>
                 <li className="nav-item">
                   <i className="icon-folder icons mr-2"></i>
                   <Link to={`/admin/system/repository_types`}  className={getClassName('settings')}>Repository Management</Link>
                 </li>
                 <li className="nav-item">
                   <i className="icon-home icons mr-2"></i>
                   <Link to={`/admin/system/reports`}  className={getClassName('settings')}>Reports</Link>
                 </li>
                 <li className="nav-item-highlight">
                   <button type="button" className="btn btn-pill btn-secondary">
                      <Link to={`/admin/systems/companies/setup`}>Create an Organizations</Link>
                   </button>
                 </li>
               </ul>
            </div>
           }
           {(this.props.user.user_type == "Organization") &&
            <div className="admin-header__mainnav">
               <ul className="nav navbar-nav">
                 <li className={getClassName('dashboard')}>
                   <i className="icon-home icons mr-2"></i>
                   <Link to={`/admin/dashboard`} className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Dashboard</Link>
                 </li>
                 <li className={getClassName('ordering')}>
                   <i className="icon-chemistry icons mr-2"></i>
                   <Link to={`/admin/ordering`}  className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Order Requests</Link>
                 </li>

                 <li className={getClassName('inventories')}>
                   <i className="icon-grid icons mr-2"></i>
                   <Link to={`/admin/inventories`} className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Inventories</Link>
                 </li>
                 <li className={getClassName('repository_groups')}>
                   <i className="icon-folder icons mr-2"></i>
                   <Link to={`/admin/repository_groups`} className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Repositories</Link>
                 </li>
                 <li className={getClassName('organization', 'hidden-sm-down')}>
                   <i className="icon-settings icons mr-2"></i>
                   <Link to={`/admin/organization`} className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Settings</Link>
                 </li>
                 <li className={getClassName('users/profile', 'hidden-md-up')}>
                   <i className="icon-user icons mr-2"></i>
                   <Link to={`/admin/users/profile`} className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Your Profile</Link>
                 </li>
                 <li className={getClassName('organization', 'hidden-md-up')}>
                   <i className="icon-organization icons mr-2"></i>
                   <Link to={`/admin/organization`} className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Organization Profile</Link>
                 </li>
                 <li className={getClassName('organization/laboratory_profiles', 'hidden-md-up')}>
                   <i className="icon-equalizer icons mr-2"></i>
                   <Link to={`/admin/organization/laboratory_profiles`} className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Laboratory Profiles</Link>
                 </li>
                 <li className={getClassName('organization/skill_groups', 'hidden-md-up')}>
                   <i className="icon-star icons mr-2"></i>
                   <Link to={`/admin/organization/skill_groups`} className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Skill Groups</Link>
                 </li>
                 <li className={getClassName('organization/users', 'hidden-md-up')}>
                   <i className="icon-people icons mr-2"></i>
                   <Link to={`/admin/organization/users`} className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Users</Link>
                 </li>
                 <li className={getClassName('signout', 'hidden-md-up')}>
                   <i className="icon-logout icons mr-2"></i>
                   <a onClick={this.logoutClicked} className="nav-link menu-item" data-toggle="collapse" data-target=".navbar-collapse">Sign out</a>
                 </li>

               </ul>
            </div>
           }
           <div className="user-info mr-20 hidden-sm-down">
             <div className="flextable">
               <div className="flextable-item flextable-primary">
                 <div className="flextable">
                   <div className="flextable-item flextable-primary"  style={{'paddingRight': '20px'}}>
                     {this.props.user.name}
                     <br />
                     {this.props.company.name}
                   </div>
                   <div className="flextable-item">
                     <MainMenuDropDown
                       user={this.props.user}
                       company={this.props.company}
                       onLogoutClicked={this.logoutClicked}
                     />
                   </div>
                 </div>
               </div>
             </div>
           </div>
          </div>
        </nav>
        {(location.pathname.indexOf('organization') > -1) &&
            <div className="admin-header__subnav hidden-sm-down">
              <div className="admin-header__subnav-item">
                <Link to={`/admin/organization`}>
                  Organization Profile
                </Link>
              </div>
              <div className="admin-header__subnav-item">
                <Link to={`/admin/organization/laboratory_profiles`}>
                  Laboratory Profiles
                </Link>
              </div>
              <div className="admin-header__subnav-item">
                <Link to={`/admin/organization/skill_groups`}>
                  Skill Groups
                </Link>
              </div>
              <div className="admin-header__subnav-item">
                <Link to={`/admin/organization/users`}>
                  Users
                </Link>
              </div>
            </div>
        }
      </div>
    );
  }
}

AdminHeader.propTypes = {
  user: PropTypes.object.isRequired,
  companies: PropTypes.array.isRequired,
  actions:PropTypes.object.isRequired,
  company:PropTypes.object.isRequired,
  lab:PropTypes.object.isRequired
};
AdminHeader.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.currentUser,
    company: state.auth.company,
    lab: state.auth.lab,
    companies: state.auth.companies
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
