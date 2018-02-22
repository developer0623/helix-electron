import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { Link, IndexLink } from 'react-router-dom';

const DashboardHeaderMenu = ({menuOptions}) => {
  return (
    <div>
      <Dropdown className="account-dropdown main-menu-drop-down">
        <DropdownTrigger>
          <span className="icon icon-cog dashhead-icon-cog"></span>
        </DropdownTrigger>
        <DropdownContent>
          <ul className="account-dropdown__management-links account-dropdown__segment">
            {menuOptions.map(menuOption =>
              <Link key={menuOption._key} to={menuOption.to}>{menuOption.link_name}</Link>
            )}
          </ul>

        </DropdownContent>
      </Dropdown>
    </div>
  );
};

DashboardHeaderMenu.propTypes = {
  menuOptions: PropTypes.array.isRequired
};

export default DashboardHeaderMenu;
