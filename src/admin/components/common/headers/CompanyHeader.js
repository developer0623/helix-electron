import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router-dom';
import ApplicationDropdown from './ApplicationDropDown';
import CompanyDropdown from './CompanyDropDown';
import AddCompanyButton from './AddCompanyButton';
import AddApplicationButton from './AddApplicationButton';
import MainMenuDropDown from './MainMenuDropDown';
import _ from 'lodash';

const CompanyHeader = ({user, application, applications, company, companies, logoutClicked, applicationChangedClick, applicationMenuOptions, companyChangedClick, companyMenuOptions, createCompanyClicked, createApplicationClicked, selectedMenuItem}) => {
  const renderIf = predicate => element => predicate && element;

  const marketingDataSets = _.filter(company.repositories, {"data_set_type": `Marketing`});
  const customDataSets = _.filter(company.repositories, {"data_set_type": `Custom`});
  const repositoryDataSets = _.filter(company.repositories, {"data_set_type": `Repository`});

  const hasCompanies = renderIf(companies.length > 0);
  const hasNoCompanies = renderIf(companies.length == 0);
  const hasApplications = renderIf(applications.length > 0);
  const hasNoApplications = renderIf(applications.length == 0);
  const hasCompanyAndRepository = renderIf(company  && company.repositories.length > 0);
  const hasDataSets = renderIf(company.data_sets.length > 0);
  const hasNoDataSets = renderIf(company.data_sets.length == 0);

  let repository = {};
  let link_type = "abstracts";

  if(company.repositories.length > 0) {
    repository = company.repositories[0];
    link_type = repository.repository_type.type_name.toLowerCase().split(' ').join('_');
  }
  let marketingDataSet;
  if(marketingDataSets.length > 0) {
    marketingDataSet = marketingDataSets[0];
  }
  let customDataSet = {};
  if(customDataSets.length > 0) {
    customDataSet = customDataSets[0];
  }
  let repositoryDataSet = {};
  if(repositoryDataSets.length > 0) {
    repositoryDataSet = repositoryDataSets[0];
  }

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
        <span className="icon icon-menu navbar-brand-icon"></span>
        Helix
      </a>
      <div className="collapse navbar-collapse mr-auto" id="navbarResponsive">
       {hasNoApplications(
         <AddApplicationButton
           createApplicationClicked={createApplicationClicked}
         />
       )}
       {hasApplications(
        <ApplicationDropdown
          applications={applications}
          selectedApplication={application}
          applicationChangedClick={applicationChangedClick}
          menuOptions={applicationMenuOptions}
          createApplicationClicked={createApplicationClicked}
        />
       )}
        <ul className="nav navbar-nav" style={{'marginLeft': '60px'}}>
          <li className="nav-item">
            {hasApplications(<Link to={`/admin/applications/${application._id}/reports/activities`} className={getClassName('reports', 'first')}>Activity</Link>)}
          </li>
          <li className="nav-item">
            {marketingDataSets.length > 0 &&
              <Link to={`/admin/organizations/${company._id}/marketing_sets/${marketingDataSet._id}/repositories/${marketingDataSet.repository._id}/entities`}  className={getClassName('marketing_sets')}>Marketing</Link>
            }
          </li>
          <li className="nav-item">
            {marketingDataSets.length == 0 &&
              <Link to={`/admin/organizations/${company._id}/marketing_sets`}  className={getClassName('marketing_sets')}>Marketing</Link>
            }
          </li>
          <li className="nav-item">
            {customDataSets.length > 0 &&
              <Link to={`/admin/organizations/${company._id}/data_sets/${customDataSet._id}/repositories/${customDataSet.repository._id}/entities`}  className={getClassName('data_sets')}>Data Sets</Link>
            }
          </li>
          <li className="nav-item">
            {customDataSets.length == 0 &&
              <Link to={`/admin/organizations/${company._id}/data_sets`}  className={getClassName('data_sets')}>Data Sets</Link>
            }
          </li>
          <li className="nav-item">
            {repositoryDataSets.length > 0 &&
              <Link to={`/admin/organizations/${company._id}/repositories/${repositoryDataSet._id}/repositories/${repositoryDataSet.repository._id}/entities`}  className={getClassName('data_sets')}>Repositories</Link>
            }
          </li>
          <li className="nav-item">
            {repositoryDataSets.length == 0 &&
              <Link to={`/admin/organizations/${company._id}/repositories`}  className={getClassName('data_sets')}>Repositories</Link>
            }
          </li>
          <li className="nav-item">
            {hasApplications(<Link to={`/admin/applications/${application._id}/settings/configuration`} className={getClassName('settings')}>App Settings</Link>)}
          </li>
        </ul>
      </div>
      <div className="collapse navbar-collapse user-info mr-20" style={{'width': 'auto'}}>
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

CompanyHeader.propTypes = {
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
  createApplicationClicked: PropTypes.func.isRequired,
  selectedMenuItem: PropTypes.string.isRequired
};

export default CompanyHeader;
