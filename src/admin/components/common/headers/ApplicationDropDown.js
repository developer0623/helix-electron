import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import ApplicationMenuItem from './ApplicationMenuItem';

const ApplicationDropdown = ({labs, lab, menuOptions, dropDownTriggerClicked, applicationChangedClick,createApplicationClicked, showDropDown}) => {
  return (
    <Dropdown {...menuOptions} className="account-dropdown application-drop-down" active={showDropDown}>
      <DropdownTrigger>
        <span className="arrow-down" onClick={dropDownTriggerClicked}>{lab.lab_name}</span>
      </DropdownTrigger>
      <DropdownContent>
        <ul className="account-dropdown__quick-links account-dropdown__segment">
          {labs.map(lab =>
            <ApplicationMenuItem key={lab._id}
              application={lab}
              applicationChangedClick={applicationChangedClick} />
          )}
          <li className="nav-item">
            <input type="button"
                value="Setup New Lab"
                className="btn btn-primary btn-pill"
                onClick={createApplicationClicked} />
          </li>
        </ul>
      </DropdownContent>
    </Dropdown>
  );
};

ApplicationDropdown.propTypes = {
  labs: PropTypes.array.isRequired,
  lab: PropTypes.object.isRequired,
  menuOptions: PropTypes.object.isRequired,
  dropDownTriggerClicked: PropTypes.func.isRequired,
  applicationChangedClick: PropTypes.func.isRequired,
  createApplicationClicked: PropTypes.func.isRequired,
  showDropDown: PropTypes.bool.isRequired
};

export default ApplicationDropdown;
