import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import CompanyMenuItem from './CompanyMenuItem';

const DropDownDropdown = ({companies, selectedCompany, companyChangedClick, menuOptions, createCompanyClicked}) => {
  return (
    <div>
      <Dropdown {...menuOptions} className="account-dropdown company-drop-down">
        <DropdownTrigger>
          <ul className="nav navbar-nav" style={{'marginLeft': '60px'}}>
            <li className="nav-item menu-dropdown-item">
              <span className="btn btn-pill btn-secondary arrow-down">{selectedCompany.name}</span>
            </li>
          </ul>
        </DropdownTrigger>
        <DropdownContent>
          <ul className="account-dropdown__quick-links account-dropdown__segment">
            {companies.map(company =>
              <CompanyMenuItem key={company._id}
                company={company}
                companyChangedClick={companyChangedClick} />
            )}
            <li className="nav-item cemt">
              <input type="button"
                  value="Add Company"
                  className="btn btn-primary btn-pill"
                  onClick={createCompanyClicked} />
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
  );
};

DropDownDropdown.propTypes = {
  companies: PropTypes.array.isRequired,
  selectedCompany: PropTypes.object.isRequired,
  companyChangedClick: PropTypes.func.isRequired,
  menuOptions: PropTypes.object.isRequired,
  createCompanyClicked: PropTypes.func.isRequired
};

export default DropDownDropdown;
