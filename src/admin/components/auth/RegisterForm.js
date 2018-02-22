import React from 'react';
import TextInput from '../common/TextInput';
import SecureTextInput from '../common/SecureTextInput';
import ErrorBlock from '../common/ErrorBlock';

const RegisterForm = ({user, onChange, onRegister, saving, errors, hasError, error}) => {
  return (
    <div className="login-box-body">
      {hasError && <ErrorBlock error={error} />}
      <form>
        <div className="form-group has-feedback">
          <TextInput
            name="first_name"
            label="First Name"
            value={user.first_name}
            onChange={onChange}
            placeholder="Enter Your First Name"
            error={errors.first_name}/>
          <span className="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div className="form-group has-feedback">
          <TextInput
            name="last_name"
            label="Last Name"
            value={user.last_name}
            onChange={onChange}
            placeholder="Enter Your Last Name"
            error={errors.last_name}/>
          <span className="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div className="form-group has-feedback">
          <TextInput
            name="username"
            label="Email Address"
            value={user.username}
            onChange={onChange}
            placeholder="Enter Your Email Address"
            error={errors.username}/>
          <span className="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div className="form-group has-feedback">
          <SecureTextInput
            name="password"
            label="Password"
            value={user.password}
            onChange={onChange}
            placeholder="Enter Your Password"
            error={errors.password}/>
          <span className="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div className="form-group text-right">
          <input
            type="submit"
            disabled={saving}
            value={saving ? 'Creating account...' : 'Create an Account'}
            className="btn btn-primary btn-block btn-flat"
            onClick={onRegister}
          />
        </div>
      </form>
    </div>
  );
};
RegisterForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onRegister: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  hasError: React.PropTypes.bool.isRequired,
  error: React.PropTypes.object
};

export default RegisterForm;
