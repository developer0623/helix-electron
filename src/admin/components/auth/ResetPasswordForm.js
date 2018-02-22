import React from 'react';
import TextInput from '../common/TextInput';
import SecureTextInput from '../common/SecureTextInput';
import {Link} from 'react-router-dom';

const ResetPasswordForm = ({password, password_confirm, onChangePassword, onChangePasswordConfirm, onSubmit, saving, errors}) => {
  return (
    <div className="login-box-body">
      <form>
        <div className="form-group has-feedback">
          <SecureTextInput
            name="password"
            label="Password"
            value={password}
            onChange={onChangePassword}
            placeholder="Enter a New Password"
            error={errors.password}/>
          <span className="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div className="form-group has-feedback">
          <SecureTextInput
            name="password_confirm"
            label="Confirm Password"
            value={password_confirm}
            onChange={onChangePasswordConfirm}
            placeholder="Enter a New Password Again"
            error={errors.password_confirm}/>
          <span className="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div className="form-group text-right">
          <input
            type="submit"
            disabled={saving}
            value={saving ? 'Submitting...' : 'Set New Password'}
            className="btn btn-primary btn-block btn-flat"
            onClick={onSubmit}/>
        </div>
        <div className="text-center">
          <Link to="/admin/login">
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
};
ResetPasswordForm.propTypes = {
  password: React.PropTypes.string.isRequired,
  password_confirm: React.PropTypes.string.isRequired,
  onChangePassword: React.PropTypes.func.isRequired,
  onChangePasswordConfirm: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ResetPasswordForm;
