import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';

const FileUpload = ({onDrop, helpText, image}) => {
    return (
      <div>
        <Dropzone onDrop={onDrop} multiple={false} className="file-upload">
          <div className="file-upload-help-text">{helpText}</div>
          {image && <img className="file-upload-image" src={image} />}
        </Dropzone>
      </div>
    );
};

FileUpload.propTypes = {
  onDrop:  PropTypes.func.isRequired,
  image: PropTypes.string,
  helpText: PropTypes.string
};

export default FileUpload;
