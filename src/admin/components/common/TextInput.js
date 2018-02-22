import React, {PropTypes} from 'react';

const TextInput = ({name, label, onChange, placeholder, value, error, width}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  let inputWrapperClass = 'field pl-0 m-auto';

  return (
    <div className={wrapperClass}>
      {label &&
        <label htmlFor={name}
          className="col-form-label">
          {label}
        </label>
      }
      <div className={inputWrapperClass}>
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}/>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  width: PropTypes.number
};

export default TextInput;
