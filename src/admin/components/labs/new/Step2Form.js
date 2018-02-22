import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import FileUpload from '../../common/FileUpload';
import KeywordInput from '../../common/KeywordInput';
import CheckboxInput from '../../common/CheckboxInput';
import _ from 'lodash';

const Step2Form = ({lab, onPrevious, onNext, onSave, onChange, saving, errors}) => {
  const lab_member = {};
  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h6>First Name?</h6>
            <TextInput
              name="first_name"
              placeholder="First Name"
              value={lab_member.first_name}
              onChange={onChange}
              error={errors.name}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h6>Last Name?</h6>
            <TextInput
              name="last_name"
              placeholder="Last Name"
              value={lab_member.last_name}
              onChange={onChange}
              error={errors.laboratory_type}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h6>Email Address</h6>
            <TextInput
              name="email_address"
              placeholder="Email Address"
              value={lab_member.email_address}
              onChange={onChange}
              error={errors.type_of_research}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h6>Phone Number</h6>
            <TextInput
              name="phone_number"
              placeholder="Phone Number"
              value={lab_member.phone_number}
              onChange={onChange}
              error={errors.keywords}
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
