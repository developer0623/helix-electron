import React, {PropTypes} from 'react';
import KeywordBubble from './KeywordBubble';

const KeywordInput = ({name, label, keyword, keywords, onChange, onSubmit, onAddKeyword, onRemoveKeyword, onChangeKeyword, placeholder, buttonText, error, width}) => {
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
  if(!buttonText) {
    buttonText = "Add Keyword";
  }
  return (
    <div className={wrapperClass}>
      {label &&
        <label htmlFor={name}
          className="col-form-label">
          {label}
        </label>
      }
      <div className={inputWrapperClass}>
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              name={name}
              className="form-control"
              placeholder={placeholder}
              value={keyword}
              onChange={onChangeKeyword}
            />
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-inline keywords-list">
              {keywords.map(keyword =>
                <KeywordBubble
                  key={keyword._key}
                  keyword={keyword}
                  onRemove={onRemoveKeyword}
                />
              )}
            </ul>
          </div>
          <div className="col-md-3" style={{'paddingLeft': '0px'}}>
            <input
              type="submit"
              value={buttonText}
              className="btn btn-primary"
              onClick={onAddKeyword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

KeywordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  keywords: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onAddKeyword: PropTypes.func.isRequired,
  onRemoveKeyword: PropTypes.func.isRequired,
  onChangeKeyword: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  width: PropTypes.number
};

export default KeywordInput;
