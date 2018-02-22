import React, {PropTypes} from 'react';
import RadioButtonListItem from './RadioButtonListItem';

const RadioButtonList = ({name, label, options, onChange, selectedValue, error}) => {
  function isChecked(value) {
    if(value == selectedValue) {
      return true;
    }
    return false;
  }
  return (
    <div className="radio-button-list">
      {label &&
        <label htmlFor={name}
          className="col-form-label">
          {label}
        </label>
      }
      <div className="radio-button-list-items">
        {options.map(option =>
          <RadioButtonListItem
            key={option._key}
            name={name}
            value={option.value}
            checked={isChecked(option.value)}
            label={option.text}
            onChange={onChange}
          />
        )}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

RadioButtonList.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequire,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
  error: PropTypes.string
};

export default RadioButtonList;
