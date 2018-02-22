import React from 'react';
import TextInput from '../common/TextInput';
import SecureTextInput from '../common/SecureTextInput';
import {Link} from 'react-router-dom';

const ForgotPasswordForm = ({email_address, onChange, onSubmit, saving, errors}) => {
  return (
    <div className="login-box-body">
      <form>
        <div className="form-group has-feedback">
          <TextInput
            name="email_address"
            label="Email Address"
            value={email_address}
            onChange={onChange}
            placeholder="Enter Email Address"
            error={errors.email_address}/>
          <span className="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div className="form-group text-right">
          <input
            type="submit"
            disabled={saving}
            value={saving ? 'Submitting...' : 'Request Reset Link'}
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
ForgotPasswordForm.propTypes = {
  email_address: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ForgotPasswordForm;
