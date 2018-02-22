import React from 'react';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
import KeywordInput from '../../../common/KeywordInput';
import _ from 'lodash';

const VideoForm = ({entity, onChange, onChangeEntityAttributes, onUpdateFieldValue, onSave, onAudioPreviewClicked, loading, saving, errors}) => {
  let tag = '';
  let tags = '';
  _.each(entity.tags, (tag) => {
    if(tags.length > 0) {
      tags += `\n`;
    }
    tags += `${tag}`;
  });
  function onAddTag(event) {
    event.preventDefault();

    if(!entity.tag) {
      return;
    }
    const values = entity.tags;

    values.push(entity.tag);

    onUpdateFieldValue("tags", values);
    onUpdateFieldValue("tag", "");
  }
  function onRemoveTag(event, keyword) {
    event.preventDefault();

    const values = entity.tags;

    _.pull(values, keyword);

    onUpdateFieldValue("tags", values);
  }
  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="name"
              label="Title"
              value={entity.name}
              onChange={onChange}
              error={errors.name}
              placeholder="Enter Title of Video"
              width={8} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="sub_title"
              label="Sub Title"
              value={entity.attributes.sub_title}
              onChange={onChangeEntityAttributes}
              error={errors.sub_title}
              placeholder="Enter Sub Title of Video"
              width={8} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <KeywordInput
              name="tag"
              label="Tags"
              keyword={entity.tag}
              keywords={entity.tags}
              onChange={onChange}
              onAddKeyword={onAddTag}
              onRemoveKeyword={onRemoveTag}
              onChangeKeyword={onChange}
              error={errors.tags}
              placeholder="Add a tag"
              buttonText="Add Tag"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="url"
              label="Url"
              value={entity.attributes.url}
              onChange={onChangeEntityAttributes}
              error={errors.url}
              placeholder="URL of Video"
              width={8} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <input
              type="submit"
              disabled={saving}
              value={saving ? 'Saving Video...' : 'Save Video'}
              className="btn btn-primary"
              onClick={onSave} />
          </div>
        </div>
      </div>
    </form>
  );
};

VideoForm.propTypes = {
  entity: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onUpdateFieldValue: React.PropTypes.func.isRequired,
  onChangeEntityAttributes: React.PropTypes.func.isRequired,
  onAudioPreviewClicked: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default VideoForm;
