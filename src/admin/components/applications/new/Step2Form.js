import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import FileUpload from '../../common/FileUpload';
import KeywordInput from '../../common/KeywordInput';
import CheckboxInput from '../../common/CheckboxInput';
import _ from 'lodash';

const Step1Form = ({application, onSave, onChange, saving, errors}) => {

  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h6>Give your virtual assistant a name.</h6>
            <TextInput
              name="name"
              placeholder="Helix AI"
              value={application.name}
              onChange={onChange}
              error={errors.name}
            />
            <div className="notes">This visible name of your virtual assistant.  The virtual assistant name will be used in this dashboard, in the Amazon Skill store (for public virtual assistants), and on devices with visual displays (ex. Echo Show).</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h6>What phrase starts your virtual assistant?</h6>
            <TextInput
              name="invocation_name"
              placeholder="Helix Bot"
              value={application.invocation_name}
              onChange={onChange}
              error={errors.invocation_name}
            />
            <div className="notes">This is the invocation phrase users will say to launch your virtual assistant.  The invocation phrase should be 2 words.</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h6>Write a few sentences about what you assistant does.</h6>
            <TextArea
              name="description"
              placeholder="Helix is a virtual assistant to help scientists and researchers improve workflows, get better results and be more productive in the lab."
              value={application.description}
              onChange={onChange}
              error={errors.invocation_name}
              rows="6"
            />
            <div className="notes">For public skills, this will be displayed in the Amazon Skill store.</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="footer-wrapper">
              <button type="submit" className="button previous">
                <i className="icons icon-arrow-left" />
                Previous
              </button>
              <button type="submit" className="button continue">
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
  application: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default Step1Form;
