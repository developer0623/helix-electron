import React from 'react';
import RepositoryTypeItem from '../RepositoryTypeItem';
import {Link} from 'react-router-dom';

const Step2Form = ({repository,onNext, onChange, onNextClick,saving, errors}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h6>{'Add inventory items'}</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 ">
          <p>{'Great You have created your new repository,Now lets add your inventory items.' +
          'Can you do this by bulk uploading items using an Excel template or add items' +
          'manually one at a time.'}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button  type="button"
                   className="button withborders"
                   onClick={onNext}>
              {'Bulk upload Inventory Items'}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button  type="button" className="button withborders">
            <Link to={`${location.pathname}/add`} className="add-item">
              {"Add inventory items Manually"}
            </Link>
          </button>
          <div className="row">
          <div className="col-md-12 step2SkipLink">
            <Link to={`/admin/inventories`} className="add-item">
            {`Skip I'll add items later.`}
          </Link>
         </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Step2Form.propTypes = {
  repository: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  onNext: React.PropTypes.func.isRequired,
  onNextClick: React.PropTypes.func.isRequired
};

export default Step2Form;
