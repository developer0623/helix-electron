import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import FileUpload from '../../common/FileUpload';

import _ from 'lodash';

import ReactS3Uploader from 'react-s3-uploader';

const ApplicationForm = ({application, companies, onSave, onChange, onUploadSmallLogo, onUploadLargeLogo, loading, saving, errors}) => {
  const companyOptions = [];
  _.each(companies, function(company) {
    companyOptions.push({
      value: company._id,
      text: company.name
    });
  });
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
  let ownerId;
  if(application.owner) {
    ownerId = application.owner._id;
  }

  return (
    <form>
      <SelectInput
        key="owner"
        name="owner"
        label="Owner"
        value={ownerId}
        onChange={onChange}
        error={errors.owner}
        options={companyOptions} />
      <TextInput
        name="name"
        label="Name"
        value={application.name}
        onChange={onChange}
        error={errors.name} />
      <TextInput
        name="invocation_name"
        label="Invocation Name"
        value={application.invocation_name}
        onChange={onChange}
        error={errors.invocation_name}/>
      <TextArea
        name="summary"
        label="Summary"
        value={application.summary}
        onChange={onChange}
        error={errors.summary}
        placeholder="Add a summary"
        width="12"
        rows="5"
      />
      <TextArea
        name="description"
        label="Description"
        value={application.description}
        onChange={onChange}
        error={errors.description}
        placeholder="Add a description"
        width="12"
        rows="5"
      />
    <div className="form-group">
      <label htmlFor="small_logo">Small Logo</label>
      <FileUpload
        onDrop={onUploadSmallLogo}/>
    </div>
    <div className="form-group">
      <label htmlFor="large_logo">Large Logo</label>
      <FileUpload
        onDrop={onUploadLargeLogo} />
    </div>
    <TextArea
        name="keywords"
        label="Keywords"
        value={keywords}
        onChange={onChange}
        error={errors.keywords}
        placeholder="Add keywords"
        width="12"
        rows="5"
      />
      <TextArea
        name="example_phrases"
        label="Example Phrases"
        value={example_phrases}
        onChange={onChange}
        error={errors.example_phrases}
        placeholder="Add Example Phrases"
        width="12"
        rows="5"
      />
      <TextArea
        name="testing_instructions"
        label="Testing Instructions"
        value={application.testing_instructions}
        onChange={onChange}
        error={errors.testing_instructions}
        placeholder="Add Testing Instructions"
        width="12"
        rows="5"
      />
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />
    </form>
  );
};

ApplicationForm.propTypes = {
  application: React.PropTypes.object.isRequired,
  companies: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onUploadSmallLogo: React.PropTypes.func.isRequired,
  onUploadLargeLogo: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ApplicationForm;
