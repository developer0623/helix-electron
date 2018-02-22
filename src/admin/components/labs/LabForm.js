import React from 'react';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';
import KeywordInput from '../common/KeywordInput';
import AddressInput from '../common/AddressInput';
import ContactInput from '../common/ContactInput';
import _ from 'lodash';

const LabForm = ({lab, address, contact, laboratoryProfiles, skillGroups, onSave, onChange, keyword, onAddKeyword, onRemoveKeyword, onChangeKeyword, loading, saving, errors}) => {
  const laboratoryProfileOptions = [];
  _.each(laboratoryProfiles, function(profile) {
    laboratoryProfileOptions.push({
      value: profile._id,
      text: profile.profile_name
    });
  });
  const skillGroupOptions = [];
  _.each(skillGroups, function(skillGroup) {
    skillGroupOptions.push({
      value: skillGroup._id,
      text: skillGroup.skill_group_name
    });
  });

  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <TextInput
                  name="lab_name"
                  label="Lab Name"
                  value={lab.lab_name}
                  onChange={onChange}
                  error={errors.lab_name}
                  placeholder="Enter the Name of your Lab"
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Give the lab space a name.  The name must be unique within your organization.
            </div>
          </div>
        </div>
        <div className="row"  >
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <TextArea
                  name="description"
                  label="Description"
                  value={lab.description}
                  placeholder="Description"
                  onChange={onChange}
                  error={errors.description}
                  rows={6}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Provide a short description of the lab space.  This may be useful in helping identify the location of the provision device.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <h5>Lab Contact Information</h5>
                <ContactInput
                  contact={contact}
                  onChange={onChange}
                  errors={errors.contact}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The name will be displayed in the Amazon/Alexa store and Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <h5>Laboratory Address</h5>
                <AddressInput
                  address={address}
                  label="Laboratory Address"
                  onChange={onChange}
                  errors={errors.laboratory_address}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The name will be displayed in the Amazon/Alexa store and Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <KeywordInput
                name="keywords"
                label="Keywords"
                keyword={keyword}
                keywords={lab.keywords}
                onChange={onChange}
                onAddKeyword={onAddKeyword}
                onRemoveKeyword={onRemoveKeyword}
                onChangeKeyword={onChangeKeyword}
                error={errors.keywords}
                placeholder="Add a keyword"
              />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Add keywords that describe your virtual assistant to help users find your app in the Alexa App or Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h5>Lab Members</h5>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Add individual lab members to this lab.  This will allow lab members to receive reminders and other notifications.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <SelectInput
              name="laboratory_profile"
              label="Laboratory Profile"
              value={lab.laboratory_profile}
              onChange={onChange}
              error={errors.laboratory_profile}
              options={laboratoryProfileOptions} />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Provision this space to a user.  This allows the specified email address to install the skills for this lab.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <SelectInput
              name="skill_group"
              label="Skill Group"
              value={lab.skill_group}
              onChange={onChange}
              error={errors.skill_group}
              options={skillGroupOptions} />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Provision this space to a user.  This allows the specified email address to install the skills for this lab.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="shared_device_arn"
              label="Provision Shared Device"
              value={lab.shared_device_arn}
              onChange={onChange}
              error={errors.shared_device_arn}
              placeholder="Enter the ARN of the shared Alexa device"
            />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Provision this space to a user.  This allows the specified email address to install the skills for this lab.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <input
                  type="submit"
                  disabled={saving}
                  value={saving ? 'Saving Lab Settings...' : 'Save Lab Settings'}
                  className="btn btn-primary"
                  onClick={onSave} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

LabForm.propTypes = {
  lab: React.PropTypes.object.isRequired,
  address: React.PropTypes.object.isRequired,
  contact: React.PropTypes.object.isRequired,
  laboratoryProfiles: React.PropTypes.array.isRequired,
  skillGroups: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  keyword: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  onAddKeyword: React.PropTypes.func.isRequired,
  onRemoveKeyword: React.PropTypes.func.isRequired,
  onChangeKeyword: React.PropTypes.func.isRequired
};

export default LabForm;
