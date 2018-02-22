import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router-dom';
import ApplicationDropdown from './ApplicationDropDown';
import CompanyDropdown from './CompanyDropDown';
import AddCompanyButton from './AddCompanyButton';
import AddApplicationButton from './AddApplicationButton';
import MainMenuDropDown from './MainMenuDropDown';
import _ from 'lodash';

const LaboratoryHeader = ({user, application, applications, company, companies, logoutClicked, applicationChangedClick, applicationMenuOptions, companyChangedClick, companyMenuOptions, createCompanyClicked, createApplicationClicked}) => {
  const renderIf = predicate => element => predicate && element;

  const hasCompanies = renderIf(companies.length > 0);
  const hasNoCompanies = renderIf(companies.length == 0);
  const hasApplications = renderIf(applications.length > 0);
  const hasNoApplications = renderIf(applications.length == 0);
  const hasCompanyAndRepository = renderIf(company  && company.repositories.length > 0);

  const repository = company.repositories[0];

  let link_type = "abstracts";
  if(repository) {
    link_type = repository.repository_type.type_name.toLowerCase().split(' ').join('_');
  }

  return (
    <nav className="navbar navbar-toggleable-sm fixed-top navbar-inverse bg-inverse app-navbar">
      <button className="navbar-toggler navbar-toggler-right hidden-md-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <a className="navbar-brand" href="../index.html">
        <span className="icon icon-menu navbar-brand-icon"></span>
        Helix
      </a>
      <div className="collapse navbar-collapse mr-auto" id="navbarResponsive">
        <ul className="nav navbar-nav" style={{'marginLeft': '60px'}}>
          <li className="nav-item">
            {hasApplications(<Link to={`/admin/applications/${application._id}/reports/activities`} className="nav-link menu-item first" activeClassName="active">Activity</Link>)}
          </li>
          <li className="nav-item">
            {hasApplications(<Link to={`/admin/organizations/${company._id}/lab`} className="nav-link menu-item" activeClassName="active">Laboratory</Link>)}
          </li>
          <li className="nav-item">
            {hasCompanyAndRepository(<Link to={`/admin/organizations/${company._id}/data_sets`} className="nav-link menu-item " activeClassName="active">Data Sets</Link>)}
          </li>
          <li className="nav-item">
            {hasCompanyAndRepository(<Link to={`/admin/organizations/${company._id}/repositories/${repository._id}/${link_type}`} className="nav-link menu-item" activeClassName="active">Repositories</Link>)}
          </li>
          <li className="nav-item">
            {hasCompanyAndRepository(<Link to={`/admin/organizations/${company._id}/inventory`} className="nav-link menu-item" activeClassName="active">Inventory</Link>)}
          </li>
          <li className="nav-item">
            {hasApplications(<Link to={`/admin/applications/${application._id}/settings`} className="nav-link menu-item" activeClassName="active">App Settings</Link>)}
          </li>
        </ul>
      </div>
      <div className="user-info mr-20">
        <div className="flextable">
          <div className="flextable-item flextable-primary">
            <div className="flextable">
              <div className="flextable-item flextable-primary"  style={{'paddingRight': '20px'}}>
                {user.name}
                <br />
                {company.name}
              </div>
              <div className="flextable-item">
                <MainMenuDropDown
                  user={user}
                  onLogoutClicked={logoutClicked}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

LaboratoryHeader.propTypes = {
  user: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  applications: PropTypes.array.isRequired,
  company: PropTypes.object.isRequired,
  companies: PropTypes.array.isRequired,
  logoutClicked: PropTypes.func.isRequired,
  applicationChangedClick: PropTypes.func.isRequired,
  applicationMenuOptions: PropTypes.object.isRequired,
  companyChangedClick: PropTypes.func.isRequired,
  companyMenuOptions: PropTypes.object.isRequired,
  createCompanyClicked: PropTypes.func.isRequired,
  createApplicationClicked: PropTypes.func.isRequired
};

export default LaboratoryHeader;
