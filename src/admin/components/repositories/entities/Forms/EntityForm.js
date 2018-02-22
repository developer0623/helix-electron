import React from 'react';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';
import TextArea from '../../../common/TextArea';
import KeywordInput from '../../../common/KeywordInput';
import EntityPropertyListRow from './EntityPropertyListRow';
import _ from 'lodash';

const EntityForm = ({entity, entityProperties, onChange, onChangeEntityAttributes, onUpdateFieldValue, onSave, onAudioPreviewClicked, loading, saving, errors}) => {
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
  function appendEntityProperty(event) {
    event.preventDefault();

    const attributes = Object.assign({}, entity.attributes);

    attributes.properties.push({
      key: '',
      value: ''
    });

    onChangeEntityAttributes(event, attributes);
  }
  function deleteEntityProperty(event, index) {
    event.preventDefault();

    const attributes = Object.assign({}, entity.attributes);

    attributes.properties.splice(index, 1);

    onChangeEntityAttributes(event, attributes);
  }
  function changeEntityProperty(event, index, field, value) {
    event.preventDefault();

    const attributes = Object.assign({}, entity.attributes);

    attributes.properties[index][field] = value;

    onChangeEntityAttributes(event, attributes);
  }
  function previewEntityProperty(event, index, audio) {
    event.preventDefault();

    const property = entityProperties[index];
    const propertySayAs = property.say_as || property.name;
    const entitySayAs = entity.say_as || entity.name;
    const entityProperty = entity.attributes.properties[index];

    const textToConvert = `The ${propertySayAs} of ${entitySayAs} is ${entityProperty.value}`;

    onAudioPreviewClicked(event, textToConvert, audio);
  }
  if(!entity.attributes) {
    entity.attributes = {
      properties: []
    };
  }
  if(!entity.attributes.properties) {
    entity.attributes.properties = [];
  }
  return (
    <form>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <TextInput
            name="name"
            label="Item Name"
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
              <h4>Lookup Properties</h4>
            </div>
            <div className="flextable-item">
              <input
                type="submit"
                className="btn btn-primary btn-pill"
                onClick={appendEntityProperty}
                value="Add Property" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pl-0">
      {entity.attributes.properties.map((property, index) =>
        <EntityPropertyListRow
          key={index}
          property={property}
          entityProperties={entityProperties}
          rowIndex={index}
          onDeleteEntityProperty={deleteEntityProperty}
          onChangeEntityProperty={changeEntityProperty}
          onPreviewEntityProperty={previewEntityProperty}
          errors={errors}
         />
      )}
      </div>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
      </div>
    </form>
  );
};

EntityForm.propTypes = {
  entity: React.PropTypes.object.isRequired,
  entityProperties: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onUpdateFieldValue: React.PropTypes.func.isRequired,
  onChangeEntityProperty: React.PropTypes.func.isRequired,
  onDeleteEntityProperty: React.PropTypes.func.isRequired,
  onPreviewEntityProperty: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  onChangeEntityAttributes: React.PropTypes.func.isRequired,
  onAudioPreviewClicked : React.PropTypes.func.isRequired
};

export default EntityForm;
