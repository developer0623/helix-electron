import React from 'react';
import TextInput from '../common/TextInput';
import SecureTextInput from '../common/SecureTextInput';

const LoginForm = ({credentials, onChange, onAuthenticate, onCreateAccountClick, saving, errors}) => {
  return (
    <div className="login-box">
      <div className="login-logo">
        <img style={{width:'300px'}} src={require('../../../images/helix.png')} />
      </div>
      <div className="login-box-body">
        <form>
          <div className="form-group has-feedback">
            <TextInput
              name="email_address"
              label="Email Address"
              value={credentials.username}
              onChange={onChange}
              error={errors.username}/>
            <span className="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div className="form-group has-feedback">
            <SecureTextInput
              name="password"
              label="Password"
              value={credentials.password}
              onChange={onChange}
              error={errors.password}/>
            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
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
        <a href="#" onClick={onCreateAccountClick}>Create Account</a>
      </div>
    </div>
  );
};
LoginForm.propTypes = {
  credentials: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onAuthenticate: React.PropTypes.func.isRequired,
  onCreateAccountClick: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LoginForm;
