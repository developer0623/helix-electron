import React from 'react';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';
import TextArea from '../../../common/TextArea';
import _ from 'lodash';

const LabMemberForm = ({entity, onSave, onChange, onChangeAttributes, loading, saving, errors}) => {
  function onUpdateEntityAttributes(event) {
    const attributes = entity.attributes;
    const field = event.target.name;
    const value = event.target.value;

    attributes[field] = value;

    return onChangeAttributes(event, attributes);
  }
  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <TextInput
                  name="first_name"
                  label="First Name"
                  value={entity.attributes.first_name}
                  onChange={onUpdateEntityAttributes}
                  error={errors.first_name}
                  placeholder="Enter the lab member's first name"
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <TextInput
                  name="last_name"
                  label="Last Name"
                  value={entity.attributes.last_name}
                  onChange={onUpdateEntityAttributes}
                  error={errors.last_name}
                  placeholder="Enter the lab member's last name"
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <TextInput
                  name="email_address"
                  label="Email Address"
                  value={entity.attributes.email_address}
                  onChange={onUpdateEntityAttributes}
                  error={errors.email_address}
                  placeholder="Enter the lab member's email address"
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <TextInput
                  name="mobile_number"
                  label="Mobile Number"
                  value={entity.attributes.mobile_number}
                  onChange={onUpdateEntityAttributes}
                  error={errors.email_address}
                  placeholder="Enter the lab member's mobile number"
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <input
                  type="submit"
                  disabled={saving}
                  value={saving ? 'Saving...' : 'Save'}
                  className="btn btn-primary"
                  onClick={onSave} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
      </div>
    </form>
  );
};

LabMemberForm.propTypes = {
  entity: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onChangeAttributes: React.PropTypes.func.isRequred,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LabMemberForm;
