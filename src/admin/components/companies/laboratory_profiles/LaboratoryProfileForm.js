import React from 'react';
import TextInput from '../../common/TextInput';

const LaboratoryProfileForm = ({laboratory_profile, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="profile_name"
                label="Profile Name"
                placeholder="Enter Profile  Name"
                value={laboratory_profile.profile_name}
                onChange={onChange}
                error={errors.profile_name}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="street_address_1"
                label="Street Address 1"
                placeholder="Enter Street Address"
                value={laboratory_profile.street_address_1}
                onChange={onChange}
                error={errors.street_address_1}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="street_address_2"
                label="Street Address 2"
                placeholder="Enter Street Address 2"
                value={laboratory_profile.street_address_2}
                onChange={onChange}
                error={errors.street_address_2}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="city"
                label="City"
                placeholder="Enter City"
                value={laboratory_profile.city}
                onChange={onChange}
                error={errors.city}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="state"
                label="State"
                placeholder="Enter State"
                value={laboratory_profile.state}
                onChange={onChange}
                error={errors.state}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="zip_code"
                label="Zip Code"
                placeholder="Zip Code"
                value={laboratory_profile.zip_code}
                onChange={onChange}
                error={errors.zip_code}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="timezone"
                label="Time Zone"
                placeholder="Time Zone"
                value={laboratory_profile.timezone}
                onChange={onChange}
                error={errors.timezone}
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
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

LaboratoryProfileForm.propTypes = {
  laboratory_profile: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LaboratoryProfileForm;
