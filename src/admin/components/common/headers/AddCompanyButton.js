import React, { Component } from 'react';
import PropTypes from 'prop-types';

const AddCompanyButton = ({createCompanyClicked}) => {
  return (
    <li className="account-dropdown__link">
      <a className="account-dropdown__link__anchor" href="#" onClick={createCompanyClicked}>
        Add Company
      </a>
    </li>
  );
};

AddCompanyButton.propTypes = {
  createCompanyClicked: PropTypes.func.isRequired
};

export default AddCompanyButton;
