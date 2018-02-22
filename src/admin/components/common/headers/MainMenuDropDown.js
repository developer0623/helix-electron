import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { Link, IndexLink } from 'react-router-dom';

const MainMenuDropdown = ({user, company, onLogoutClicked}) => {
  const renderIf = predicate => element => predicate && element;

  const isAdmin = renderIf(user.user_type == "Administrator");
  const isOrganization = renderIf(user.user_type == "Organization");
  const isCustomer = renderIf(user.user_type == "Customer");

  return (
    <div>
      <Dropdown className="account-dropdown main-menu-drop-down">
        <DropdownTrigger>
          <span className="icons icon-user nav-settings-cog"></span>
        </DropdownTrigger>
        <DropdownContent>
          <div className="account-dropdown__identity account-dropdown__segment">
            <h6>Signed In As</h6>
            <div>
              {user.name}
              <br />
              {company.name || user.email_address}
            </div>
          </div>
          <ul className="account-dropdown__quick-links account-dropdown__segment">
            <li className="account-dropdown__link">
              <Link to={`/admin/users/profile`}>Your Profile</Link>
            </li>
          </ul>
          <ul className="account-dropdown__management-links account-dropdown__segment">
            <li className="account-dropdown__link">
              <a className="account-dropdown__link__anchor" href="#" onClick={onLogoutClicked}>
                Sign out
              </a>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
  );
};

MainMenuDropdown.propTypes = {
  user: PropTypes.object.isRequired,
  company: PropTypes.object,
  onLogoutClicked: PropTypes.func.isRequired
};

export default MainMenuDropdown;
