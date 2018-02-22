import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import RadioButtonList from '../../common/RadioButtonList';

import _ from 'lodash';

const AccessControlForm = ({application, accessControlList, onSave, onChange, onUpdateApplication, loading, saving, errors}) => {
  const renderIf = predicate => element => predicate && element;

  let email_addresses = '';
  _.each(accessControlList.email_addresses, (email_address) => {
    if(email_addresses.length > 0) {
      email_addresses += `\n`;
    }
    email_addresses += `${email_address}`;
  });
  const accessControlOptions = [{
    text: "Pubic - Anyone can download, install and use my virtual assistant",
    value: "public"
  }, {
    text: "Private - Restrict access to my virtual assistant to the email addresses I provide below.",
    value: "private"
  }];
  const isPrivate = renderIf(application.access_control == "private");

  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <RadioButtonList
              name="access_control"
              options={accessControlOptions}
              onChange={onUpdateApplication}
              selectedValue={application.access_control}
            />
          </div>
          <div className="col-md-3">
          </div>
        </div>
      {isPrivate(
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextArea
                name="email_addresses"
                label="Email Address List"
                value={email_addresses}
                onChange={onChange}
                error={errors.email_addresses}
                placeholder="Access Control List"
                width="12"
                rows="12"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              List all the email addresses that you want to be able to access your virtual assistant.  Add one email address per row.
            </div>
          </div>
        </div>
        )}
        <div className="row">
          <div className="col-md-8">
            <input
              type="submit"
              disabled={saving}
              value={saving ? 'Saving...' : 'Save'}
              className="btn btn-primary"
              onClick={onSave} />
          </div>
        </div>
      </div>
    </form>
  );
};

AccessControlForm.propTypes = {
  application: React.PropTypes.object.isRequired,
  accessControlList: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onUpdateApplication: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default AccessControlForm;
