import React, {PropTypes}  from 'react';

const UploadFilePopup = ({fileName,onFileChange, onCancel, onUploadButtonClick}) => {
  return (
    <div className="iam-role-popup">
          <div className="popup_inner">
            <p className="popup-title">Upload File</p>
            <input
              type="file"
              onChange={onFileChange}
              
            />
            <div className="row">
              <div className="col-md-6">
                <button onClick={onCancel}>Cancel</button>
              </div>
              <div className="col-md-6">
                <button onClick={onUploadButtonClick}>Upload CSV</button>
              </div>
            </div>
          </div>
    </div>
  );
};

UploadFilePopup.propTypes = {
  fileName: PropTypes.string.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUploadButtonClick: PropTypes.func.isRequired
};

export default UploadFilePopup;
