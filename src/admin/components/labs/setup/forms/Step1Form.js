import React from 'react';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
import FileUpload from '../../../common/FileUpload';
import KeywordInput from '../../../common/KeywordInput';
import CheckboxInput from '../../../common/CheckboxInput';
import _ from 'lodash';

const Step1Form = ({lab, onPrevious, onNext, onSave, onChange, saving, errors}) => {

  return (
    <form className="onboard-form add-flow">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h5>{"Give your lab a name!"}</h5>
            <TextInput
              name="lab_name"
              placeholder="Enter a lab name"
              value={lab.lab_name}
              onChange={onChange}
              error={errors.lab_name}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="footer-wrapper">
              <button type="submit" onClick={onPrevious} className="button previous">
                <i className="icons icon-arrow-left" />
                Previous
              </button>
              <button type="submit" onClick={onNext} className="button continue">
                Next
                <i className="icons icon-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

Step1Form.propTypes = {
  lab: React.PropTypes.object.isRequired,
  onPrevious: React.PropTypes.func.isRequired,
  onNext: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default Step1Form;
