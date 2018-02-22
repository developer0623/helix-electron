import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router-dom';
import ApplicationDropdown from '../common/headers/ApplicationDropDown';
import AddApplicationButton from '../common/headers/AddApplicationButton';

const SubNavigation = ({company, application, applications, applicationMenuOptions, applicationChangedClicked, createApplicationClicked}) => {
  const renderIf = predicate => element => predicate && element;

  const hasApplications = renderIf(applications.length > 0);
  const hasNoApplications = renderIf(applications.length == 0);

  return (
    <div>
      <div className="sub-nav mt-4 mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item">
            {hasNoApplications(
              <AddApplicationButton
                createApplicationClicked={createApplicationClicked}
              />
            )}
            {hasApplications(
             <ApplicationDropdown
               applications={applications}
               selectedApplication={application}
               applicationChangedClick={applicationChangedClicked}
               menuOptions={applicationMenuOptions}
               createApplicationClicked={createApplicationClicked}
             />
            )}
          </li>
          <li className="nav-item">
            <Link to={`/admin/applications/${application._id}/reports/activities`} className="mr-1" activeClassName="active">Activity</Link>
          </li>
          <li className="nav-item active">
            <Link to={`/admin/organizations/${company._id}/lab`} className="mr-1" activeClassName="active">Lab Setup</Link>
          </li>
          <li className="nav-item active">
            <Link to={`/admin/organizations/${company._id}/lab/inventories`} className="mr-1" activeClassName="active">Inventories</Link>
          </li>
          <li className="nav-item active">
            <Link to={`/admin/organizations/${company._id}/lab/repositories`} className="mr-1" activeClassName="active">Repositories</Link>
          </li>
          <li className="nav-item active">
            <Link to={`/admin/organizations/${company._id}/lab/quick_actions`} className="mr-1" activeClassName="active">Quick Actions</Link>
          </li>
          <li className="nav-item active">
            <Link to={`/admin/applications/${application._id}/settings/configuration`} className="mr-1" activeClassName="active">App Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

SubNavigation.propTypes = {
  company: PropTypes.object.isRequired,
  labs: PropTypes.array.isRequired,
  application: PropTypes.object.isRequired,
  applications: PropTypes.array.isRequired,
  selectedApplication: PropTypes.object.isRequired,
  applicationChangedClick: PropTypes.func.isRequired,
  applicationMenuOptions: PropTypes.object.isRequired,
  createApplicationClicked: PropTypes.func.isRequired,
  applicationChangedClicked: PropTypes.func.isRequired
};

export default SubNavigation;
