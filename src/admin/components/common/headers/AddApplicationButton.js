import React, { Component } from 'react';
import PropTypes from 'prop-types';

const AddApplicationButton = ({createApplicationClicked}) => {
  return (
    <ul className="nav navbar-nav" style={{'marginLeft': '20px'}}>
      <li className="nav-item menu-dropdown-item">
        <input type="button"
            value="Add Lab Space"
            className="btn btn-secondary btn-pill"
            onClick={createApplicationClicked} />
      </li>
    </ul>
  );
};

AddApplicationButton.propTypes = {
  createApplicationClicked: PropTypes.func.isRequired
};

export default AddApplicationButton;
