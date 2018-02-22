import React, {PropTypes}  from 'react';
import TextInput from '../common/TextInput';

const SignUpForm = ({signUp, onSignUp, onChange, saving, errors}) => {
  const titleCopy = 'Sign up for updates!';
  const subTitleCopy = 'We’re still busy building Helix but we love to chat.  Sign up for updates and we’ll let you know when we’re ready to launch!';
  const successCopy = 'Thank you.  We\'ll be in touch!';
  const signUpVisibility = signUp.show_success ? 'hidden' : 'visible';
  const successDisplay = signUp.show_success ? 'inherit' : 'none';

  return (
    <section id="signup-form">
      <div className="container">
        <div className="row text-center">
          <div className="form">
            <div className="heading">
              <h2>{titleCopy}</h2>
              <p className="sub-title">{subTitleCopy}</p>
            </div>
            <div className="form-wrapper">
              <div style={{display: successDisplay}} className="success-message text-center">
                <h4>{successCopy}</h4>
              </div>
              <form style={{visibility: signUpVisibility}} className="form-horizontal">
                <div className="form-group text-left">
                  <label htmlFor="txtName" className="col-sm-4 control-label">Your Name</label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="txtName"
                      className="form-control"
                      name="full_name"
                      value={signUp.full_name}
                      onChange={onChange}
                      maxLength="120" />
                  </div>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="email_address" className="col-sm-4 control-label">Email *</label>
                  <div className="col-sm-7">
                    <input
                      type="email"
                      id="email_address"
                      className="form-control"
                      name="email_address"
                      value={signUp.email_address}
                      onChange={onChange}
                      maxLength="120" />
                    <span className="error-message">{errors.email_address}</span>
                  </div>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="message" className="col-sm-4 control-label">Message</label>
                  <div className="col-sm-7">
                    <textarea
                      name="message"
                      className="form-control"
                      value={signUp.message}
                      onChange={onChange}
                      rows="6">
                    </textarea>
                  </div>
                </div>
                <div className="form-group text-left">
                  <div className="col-sm-offset-4 col-sm-8">
                    <input
                      type="submit"
                      disabled={saving}
                      value={saving ? 'Sending...' : 'Submit'}
                      className="signup-button-submit btn btn-lg btn-secondary"
                      onClick={onSignUp} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

SignUpForm.propTypes = {
  signUp: PropTypes.object.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object
};
export default SignUpForm;
