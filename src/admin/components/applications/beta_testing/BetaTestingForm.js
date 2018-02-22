import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import RadioButtonList from '../../common/RadioButtonList';

import _ from 'lodash';

const BetaTestingForm = ({betaTestingList, onSave, onChange, loading, saving, errors}) => {
  let email_addresses = '';
  _.each(betaTestingList.email_addresses, (email_address) => {
    if(email_addresses.length > 0) {
      email_addresses += `\n`;
    }
    email_addresses += `${email_address}`;
  });

  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextArea
                name="email_addresses"
                label="Email Address List"
                value={email_addresses}
                onChange={onChange}
                error={errors.email_addresses}
                placeholder="Beta Testing List"
                width="12"
                rows="12"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              List all the email addresses that are able to beta test your virtual assistant.  Add one email address per row.
            </div>
          </div>
        </div>
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

BetaTestingForm.propTypes = {
  betaTestingList: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default BetaTestingForm;
