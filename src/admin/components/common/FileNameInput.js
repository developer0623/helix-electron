import React, {PropTypes} from 'react';
import ReactAudioPlayer from 'react-audio-player';

const FileNameInput = ({name, label, onChange, onPlayClicked, placeholder, value, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  let audio;
  function playAbstract(event) {
    return onPlayClicked(event, audio);
  }
  return (
    <div className={wrapperClass}>
      {label &&
        <label htmlFor={name}
          className="col-form-label">
          {label}
        </label>
      }
      <div className="row" style={{'marginLeft': '0px', 'marginRight': '0px;'}}>
        <div className="field pl-0 ml-0 col-md-8">
          <input
            type="text"
            name={name}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}/>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <div className="field pl-0 ml-0 col-md-1">
          <ReactAudioPlayer
            ref={function(element){ audio = element; }} />
          <button type="button" className="btn btn-xs btn-pill btn-primary" onClick={playAbstract}>
            <span className="icon icon-triangle-right navbar-brand-icon"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

FileNameInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onPlayClicked: React.PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default FileNameInput;
