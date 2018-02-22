import React from 'react';
import {Link} from 'react-router-dom';

import RepositoryTypeItem from '../RepositoryTypeItem';

const Step3Form = ({repository,saving, errors}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h6>{'Download Excel template'}</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 strp3Infotext">
          <p>To Bulk upload your inventory,first download our Excel spreadsheet template.<br/>
          After you download the template add your inventory to spreadsheet,Save
          <br/> it and upload it.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button  type="button" className="button filedownloadButton" >
          <i className="fa fa-cloud-download" aria-hidden="true"></i>&nbsp;&nbsp;{"Download Excel Template"}
          </button>
        </div>
      </div>
    </div>
  );
};

Step3Form.propTypes = {
  repository: React.PropTypes.object.isRequired,
  onUploadInventoryClick: React.PropTypes.func.isRequired,
  onInventoryFileChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default Step3Form;
