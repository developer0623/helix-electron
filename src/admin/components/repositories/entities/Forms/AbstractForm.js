import React from 'react';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
import FileNameInput from '../../../common/FileNameInput';

const AbstractForm = ({entity, onSave, onChange, onAudioPreviewClicked, loading, saving, errors}) => {
  let audio;
  function playAbstract(event) {
    return onAudioPreviewClicked(event, audio);
  }
  return (
    <form>
      <TextInput
        name="title"
        label="Article Title"
        value={entity.name}
        onChange={onChange}
        error={errors.name}
        placeholder="Enter Article Title"
        width="8" />
      <TextInput
        name="publication"
        label="Publication"
        value={entity.publication}
        onChange={onChange}
        error={errors.say_as}
        placeholder="Enter Name of Publication"
        width="8" />
      <TextInput
        name="author"
        label="Author"
        value={entity.author}
        onChange={onChange}
        error={errors.author}
        placeholder="Enter Name of Author"
        width="8" />
      <TextInput
        name="reference_id"
        label="External Reference Id"
        value={entity.reference_id}
        onChange={onChange}
        error={errors.author}
        placeholder="External Reference Id"
        width="8" />
      <TextArea
        name="text"
        label="Abstract Text"
        value={entity.text}
        onChange={onChange}
        error={errors.summary}
        placeholder="Enter Abstract Text"
        width="12"
        rows="20"
      />
      <FileNameInput
        name="filename"
        label="Filename"
        value={entity.filename}
        onChange={onChange}
        onPlayClicked={onAudioPreviewClicked}
        error={errors.filename}
        placeholder="Filename" />
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving Abstract...' : 'Save Abstract'}
        className="btn btn-primary"
        onClick={onSave} />
    </form>
  );
};

AbstractForm.propTypes = {
  entity: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onAudioPreviewClicked: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default AbstractForm;
