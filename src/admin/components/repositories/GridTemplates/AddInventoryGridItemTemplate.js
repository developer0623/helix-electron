import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const AddInventoryGridItemTemplate = ({onButtonClick, buttonText}) => {
  return (
    <button onClick={onButtonClick} type="button" className="btn btn-pill create-btn hidden-sm-down">
      <i className="icons icon-plus add-item"></i>&nbsp;
      {buttonText}
    </button>
  );
};

AddInventoryGridItemTemplate.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default AddInventoryGridItemTemplate;
