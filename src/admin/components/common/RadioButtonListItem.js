import React, {PropTypes} from 'react';

const RadioButtonListItem = ({name, value, checked, label, onChange, width}) => {
  return (
    <div className="radio-button-list-item">
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        /> {label}
      </label>
    </div>
  );
};

RadioButtonListItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string
};

export default RadioButtonListItem;
