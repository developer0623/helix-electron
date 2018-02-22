import React, {PropTypes} from 'react';

const CheckboxInput = ({name, label, onChange, value, error}) => {
  return (
    <div className="form-group">
      <div className="field">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <input
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChange} />
          {label &&
            <label htmlFor={name} style={{'marginLeft': '4px'}}>{label}</label>
          }
      </div>
    </div>
  );
};

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.boolean,
  error: PropTypes.string
};

export default CheckboxInput;
