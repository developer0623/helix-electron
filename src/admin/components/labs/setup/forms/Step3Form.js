import React from 'react';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
import FileUpload from '../../../common/FileUpload';
import KeywordInput from '../../../common/KeywordInput';
import CheckboxInput from '../../../common/CheckboxInput';
import _ from 'lodash';

const Step2Form = ({lab, onPrevious, onNext, onSave, onChange, saving, errors}) => {

  return (
    <form className="onboard-form">
      <div className="container-fluid" style={{'marginBottom': '200px'}}>
        <div className="row">
          <div className="col-md-12">
            <h2>{"Add a Few Keywords about Your Lab or Area of Research."}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input type="file"/>
            <button type="submit">Upload CSV</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="footer-wrapper">
              <button type="submit" onClick={onPrevious}  className="button previous">
                <i className="icons icon-arrow-left" />
                Previous
              </button>
              <button type="submit" onClick={onNext}  className="button continue">
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

Step2Form.propTypes = {
  lab: React.PropTypes.object.isRequired,
  onPrevious: React.PropTypes.func.isRequired,
  onNext: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default Step2Form;
