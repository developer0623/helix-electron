import React from 'react';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
import KeywordInput from '../../../common/KeywordInput';
import ProtocolStepListRow from './ProtocolStepListRow';
import ProtocolSetupStepListRow from './ProtocolSetupStepListRow';

import _ from 'lodash';

const ProtocolForm = ({entity, onChange, onChangeEntityAttributes, onUpdateFieldValue, onSave, onAudioPreviewClicked, loading, saving, errors}) => {
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
  function onAddSynonym(event) {
    event.preventDefault();

    if(!entity.synonym) {
      return;
    }
    const values = entity.synonyms;

    values.push(entity.synonym);

    onUpdateFieldValue("synonyms", values);
    onUpdateFieldValue("synonym", "");
  }
  function onRemoveSynonym(event, keyword) {
    event.preventDefault();

    const values = entity.synonyms;

    _.pull(values, keyword);

    onUpdateFieldValue("synonyms", values);
  }
  function playProtocolStep(event, index, audio) {
    event.preventDefault();

    const step = entity.attributes.steps[index];
    const stepSayAs = step.say_as || step.name;

    let textToConvert;

    if(index == 0) {
      textToConvert = `First, ${stepSayAs}`;
    } else if (index == entity.attributes.steps.length - 1) {
      textToConvert = `Finally, ${stepSayAs}`;
    } else {
      textToConvert = `Next, ${stepSayAs}`;
    }

    onAudioPreviewClicked(event, textToConvert, audio);
  }
  function appendProtocolStepInput(event) {
    event.preventDefault();

    const attributes = Object.assign({}, entity.attributes);
    attributes.steps.push({
      name: '',
      say_as: '',
      can_remind: false,
      reminder_minutes: '',
      reminder_copy: '',
      step_type: 'Action'
    });

    onChangeEntityAttributes(event, attributes);
  }
  function deleteProtocolStepInput(rowIndex, event) {
    event.preventDefault();

    const attributes = Object.assign({}, entity.attributes);

    attributes.steps.splice(rowIndex, 1);

    onChangeEntityAttributes(event, attributes);
  }
  function updateProtocolStepsState(event, index, field, value) {
    event.preventDefault();

    const attributes = Object.assign({}, entity.attributes);

    attributes.steps[index][field] = value;

    onChangeEntityAttributes(event, attributes);
  }
  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="name"
              label="Protocol Name"
              value={entity.name}
              onChange={onChange}
              error={errors.name}
              placeholder="Enter the name of the recipe"
              width={8}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="say_as"
              label="Say As"
              value={entity.say_as}
              onChange={onChange}
              error={errors.say_as}
              placeholder="Enter the say-as for the recipe"
              width={8}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="display_as"
              label="Display As"
              value={entity.display_as}
              onChange={onChange}
              error={errors.display_as}
              placeholder="Enter the display-as for the recipe"
              width={8}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <KeywordInput
              name="synonym"
              label="Synonyms"
              keyword={entity.synonym}
              keywords={entity.synonyms}
              onChange={onChange}
              onAddKeyword={onAddSynonym}
              onRemoveKeyword={onRemoveSynonym}
              onChangeKeyword={onChange}
              error={errors.synonyms}
              placeholder="Enter other names for this recipe"
              buttonText="Add Synonym"
            />
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
              placeholder="Enter other tags associated with this recipe"
              buttonText="Add Tag"
            />
          </div>
        </div>
        <div className="row" style={{'marginTop': '40px',
          'borderBottom': 'solid 1px #e4e4e4',
          'marginBottom': '20px'
        }}>
          <div className="col-md-12">
            <div className="flextable mb-2">
              <div className="flextable-item flextable-primary">
                <h4>Steps</h4>
              </div>
              <div className="flextable-item">
                <input
                  type="submit"
                  className="btn btn-primary btn-pill"
                  onClick={appendProtocolStepInput}
                  value="Add Step" />
              </div>
            </div>
          </div>
        </div>
      <div className="container-fluid pl-0 pr-0">
      {entity.attributes.steps.map((step, index) =>
        <ProtocolStepListRow
          key={index}
          protocol_step={step}
          rowIndex={index}
          onAppendProtocolStepInput={appendProtocolStepInput}
          onDeleteProtocolStepInput={deleteProtocolStepInput}
          onChangeProtocolStep={updateProtocolStepsState}
          onPlayProtocolStep={playProtocolStep}
          errors={errors}
         />
      )}
      </div>
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving Protocol...' : 'Save Protocol'}
        className="btn btn-primary"
        onClick={onSave} />
    </div>
    </form>
  );
};

ProtocolForm.propTypes = {
  entity: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  onChangeEntityAttributes: React.PropTypes.func.isRequired,
  onUpdateFieldValue: React.PropTypes.func.isRequired,
  onAudioPreviewClicked: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ProtocolForm;
