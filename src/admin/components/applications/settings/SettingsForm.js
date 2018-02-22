import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import FileUpload from '../../common/FileUpload';
import KeywordInput from '../../common/KeywordInput';
import CheckboxInput from '../../common/CheckboxInput';
import LanguageCheckboxInput from './LanguageCheckboxInput';

import _ from 'lodash';
import ReactS3Uploader from 'react-s3-uploader';

const SettingsForm = ({application, welcomeBackgroundUrl, onSave, onChange, onUploadLogo, onUploadWelcomeBackground, onAddKeyword, onRemoveKeyword, onChangeKeyword, keyword, isEnabledLanguage, onUpdateLanguage, loading, saving, errors}) => {
  let keywords = '';
  _.each(application.keywords, (keyword) => {
    if(keywords.length > 0) {
      keywords += `\n`;
    }
    keywords += `${keyword}`;
  });
  let example_phrases = '';
  _.each(application.example_phrases, (example_phrase) => {
    if(example_phrases.length > 0) {
      example_phrases += `\n`;
    }
    example_phrases += `${example_phrase}`;
  });

  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <h5>Platforms</h5>
            <CheckboxInput
              name="platform_amazon"
              label="Amazon/Alexa"
              value={application.platform_amazon}
              onChange={onChange}
              error={errors.platfrom_amazon}
            />
            <CheckboxInput
              name="platform_google"
              label="Google"
              value={application.platform_google}
              onChange={onChange}
              error={errors.platfrom_google}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h5>Languages</h5>
            <LanguageCheckboxInput
              platform="Amazon"
              locale="en-US"
              label="English - US"
              onChange={onUpdateLanguage}
              isEnabledLanguage={isEnabledLanguage}
              error={errors}
            />
            <LanguageCheckboxInput
              platform="Amazon"
              locale="en-GB"
              label="English - UK"
              onChange={onUpdateLanguage}
              isEnabledLanguage={isEnabledLanguage}
              error={errors}
            />
            <LanguageCheckboxInput
              platform="Amazon"
              locale="en-IN"
              label="English - India"
              onChange={onUpdateLanguage}
              isEnabledLanguage={isEnabledLanguage}
              error={errors}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="name"
              label="Name"
              value={application.name}
              onChange={onChange}
              error={errors.name} />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The name will be displayed in the Amazon/Alexa store and Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="invocation_name"
              label="Invocation Phrase"
              value={application.invocation_name}
              placeholder="Enter invocation phrase"
              onChange={onChange}
              error={errors.invocation_name}/>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              A short phrase (one or two words) that launches your virtual assistant. Ex. 'Helix'
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextArea
              name="summary"
              label="Summary"
              value={application.summary}
              onChange={onChange}
              error={errors.summary}
              placeholder="Add a summary"
              width={12}
              rows={5}
            />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              A short summary of your virtual assistant that will be display in the Alexa App or Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextArea
              name="description"
              label="Description"
              value={application.description}
              onChange={onChange}
              error={errors.description}
              placeholder="Add a description"
              width={12}
              rows={5}
            />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              A full description of you virtual assistant.  This should reference who can access your skill and how to get started.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <label htmlFor="logo">Logo</label>
              <FileUpload
                onDrop={onUploadLogo}
                helpText="Upload Logo"
                image={(application.large_logo) ? application.large_logo : null}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Your virtual assistant’s logo will be displayed in the Alexa App and Google Home store.  Also, the logo will be displayed on devices with visual displays (Echo Show).
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <KeywordInput
                name="keywords"
                label="Keywords"
                keyword={keyword}
                keywords={application.keywords}
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
            <h5>Prompts</h5>
            <TextInput
              name="default_launch_prompt"
              label="Default Launch Prompt"
              value={application.default_launch_prompt}
              placeholder="Enter default launch prompt"
              onChange={onChange}
              error={errors.default_launch_prompt}/>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The default phrase your virtual assistant says when it is first launched.  Ex. 'What can I help you with?'
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="default_launch_reprompt"
              label="Default Launch Reprompt"
              value={application.default_launch_reprompt}
              placeholder="Enter default launch reprompt"
              onChange={onChange}
              error={errors.default_launch_prompt}/>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The default phrase your virtual assistant says when it is first launched and does not hear a prompt from the user.  Ex. 'Ask me the molecular weight of acetic anhydryde?'
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group welcome-background">
              <label htmlFor="background_image">Welcome Screen Background (Echo Show)</label>
              <FileUpload
                onDrop={onUploadWelcomeBackground}
                helpText="Upload Image"
                image={(welcomeBackgroundUrl) ? welcomeBackgroundUrl : null}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Your virtual assistant’s logo will be displayed in the Alexa App and Google Home store.  Also, the logo will be displayed on devices with visual displays (Echo Show).
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

SettingsForm.propTypes = {
  application: React.PropTypes.object.isRequired,
  welcomeBackgroundUrl: React.PropTypes.string,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onUploadLogo: React.PropTypes.func.isRequired,
  onUploadWelcomeBackground: React.PropTypes.func.isRequired,
  onAddKeyword: React.PropTypes.func.isRequired,
  onRemoveKeyword: React.PropTypes.func.isRequired,
  onChangeKeyword: React.PropTypes.func.isRequired,
  keyword: React.PropTypes.string.isRequired,
  isEnabledLanguage: React.PropTypes.func.isRequired,
  onUpdateLanguage: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default SettingsForm;
