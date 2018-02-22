import React from 'react';
import TextInput from '../../common/TextInput';

const UserForm = ({user, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="first_name"
                label="First Name"
                placeholder="Enter First Name"
                value={user.first_name}
                onChange={onChange}
                error={errors.first_name}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="last_name"
                label="Last Name"
                placeholder="Enter Last Name"
                value={user.last_name}
                onChange={onChange}
                error={errors.last_name}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="email_address"
                label="Email Address"
                placeholder="Enter Email Address"
                value={user.email_address}
                onChange={onChange}
                error={errors.email_address}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="mobile_number"
                label="Phone Number"
                placeholder="Enter Phone Number"
                value={user.mobile_number}
                onChange={onChange}
                error={errors.mobile_number}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

UserForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default UserForm;
