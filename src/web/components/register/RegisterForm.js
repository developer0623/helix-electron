import React from 'react';
import TextInput from '../common/TextInput';
import SecureTextInput from '../common/SecureTextInput';

const RegisterForm = ({user, onChange, onRegisterClick, onLoginClick, saving, errors}) => {
  return (
    <div className="login-box">
      <div className="login-logo">
        <img style={{width:'300px'}} src={require('../../../images/helix.png')} />
      </div>
      <div className="login-box-body">
        <form>
          <div className="form-group has-feedback">
            <TextInput
              name="first_name"
              label="First Name"
              value={user.first_name}
              onChange={onChange}
              error={errors.first_name}
              placeholder="Your first name"/>
          </div>
          <div className="form-group has-feedback">
            <TextInput
              name="last_name"
              label="Last Name"
              value={user.last_name}
              onChange={onChange}
              error={errors.last_name}
              placeholder="Your last name"
            />
          </div>
          <div className="form-group has-feedback">
            <TextInput
              name="company_name"
              label="Company/Institution Name"
              value={user.company_name}
              onChange={onChange}
              error={errors.company_name}
              placeholder="Company or institution name"
            />
          </div>
          <div className="form-group has-feedback">
            <TextInput
              name="email_address"
              label="Email Address"
              value={user.email_address}
              onChange={onChange}
              error={errors.email_address}
              placeholder="Your email address"
            />
          </div>
          <div className="form-group has-feedback">
            <TextInput
              name="mobile_number"
              label="Mobile Number"
              value={user.mobile_number}
              onChange={onChange}
              error={errors.mobile_number}
              placeholder="Your mobile number"
            />
          </div>
          <div className="form-group has-feedback">
            <SecureTextInput
              name="password"
              label="Password"
              value={user.password}
              onChange={onChange}
              error={errors.password}
              placeholder="Super secret password"
            />
          </div>
          <div className="form-group text-right">
            <input
              type="submit"
              disabled={saving}
              value={saving ? 'Creating account...' : 'Create Account'}
              className="btn btn-primary btn-block btn-flat"
              onClick={onRegisterClick}/>
          </div>
        </form>
        <a href="#" onClick={onLoginClick}>Login</a>
      </div>
    </div>
  );
};
RegisterForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onRegisterClick: React.PropTypes.func.isRequired,
  onLoginClick: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default RegisterForm;
