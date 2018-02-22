import React from 'react';
import TextInput from '../common/TextInput';
import SecureTextInput from '../common/SecureTextInput';

const UserForm = ({user, onSave, onChange, password, onChangePassword, onSavePassword, saving, errors}) => {
  return (
    <div>
      <form>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <h5>Profile Settings</h5>
            </div>
          </div>
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
                  value={saving ? 'Saving...' : 'Save Profile'}
                  className="btn btn-primary"
                  onClick={onSave}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <form>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <h5>Change Password</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="form-group">
                <SecureTextInput
                  name="current_password"
                  label="Current Password"
                  placeholder="Enter Current Password"
                  value={password.current_password}
                  onChange={onChangePassword}
                  error={errors.password.current_password}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="form-group">
                <SecureTextInput
                  name="new_password"
                  label="New Password"
                  placeholder="Enter New Current Password"
                  value={password.new_password}
                  onChange={onChangePassword}
                  error={errors.password.new_password}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="form-group">
                <SecureTextInput
                  name="new_password_again"
                  label="New Password Again"
                  placeholder="Enter New Current Password Again"
                  value={password.new_password_again}
                  onChange={onChangePassword}
                  error={errors.password.new_password_again}
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
                  value={saving ? 'Saving...' : 'Change Password'}
                  className="btn btn-primary"
                  onClick={onSavePassword}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

UserForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  password: React.PropTypes.object.isRequired,
  onSavePassword: React.PropTypes.func.isRequired,
  onChangePassword: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default UserForm;
