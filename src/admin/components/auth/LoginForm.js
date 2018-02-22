import React from 'react';
import TextInput from '../common/TextInput';
import SecureTextInput from '../common/SecureTextInput';
import ErrorBlock from '../common/ErrorBlock';
import {Link} from 'react-router-dom';

const LoginForm = ({credentials, onChange, onAuthenticate, saving, errors, hasError, error}) => {
  return (
    <div className="login-box-body">
      {hasError && <ErrorBlock error={error} />}
      <form>
        <div className="form-group has-feedback">
          <TextInput
            name="username"
            label="Email Address"
            value={credentials.username}
            onChange={onChange}
            placeholder="Enter Email Address"
            error={errors.username}/>
          <span className="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div className="form-group has-feedback">
          <SecureTextInput
            name="password"
            label="Password"
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter Password"
            error={errors.password}/>
          <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          <Link to="/admin/forgot_password">
            Forgot Password?
          </Link>
        </div>
        <div className="form-group text-right">
          <input
            type="submit"
            disabled={saving}
            value={saving ? 'Logging in...' : 'Sign In'}
            className="btn btn-primary btn-block btn-flat"
            onClick={onAuthenticate}/>
      </div>
      </form>
    </div>
  );
};
LoginForm.propTypes = {
  credentials: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onAuthenticate: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  hasError: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string
};

export default LoginForm;
