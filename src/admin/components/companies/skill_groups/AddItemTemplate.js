import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const AddItemTemplate = ({onButtonClick}) => {
  return (
    <button id="inventoriesAddButton" type="button" className="btn create-btn" onClick={onButtonClick}>
      <i className="icons icon-plus add-item"></i>
      Add Skill Group
    </button>
  );
};

AddItemTemplate.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};

export default AddItemTemplate;
