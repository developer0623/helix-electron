import React, {PropTypes} from 'react';

const TextAreaInput = ({name, label, onChange, placeholder, value, error, width, rows}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  let inputWrapperClass = 'field pl-0 ml-0';
  if(width) {
    inputWrapperClass += ' col-md-' + width;
  } else {
    inputWrapperClass += ' col-md-12';
  }
  return (
    <div className={wrapperClass}>
      {label &&
        <label htmlFor={name}>{label}</label>
      }
      <div className={inputWrapperClass}>
        <textarea
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
          rows={rows} >
        </textarea>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  width: PropTypes.number,
  rows: PropTypes.number
};

export default TextAreaInput;
