import React from 'react';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';
import TextArea from '../../../common/TextArea';

import _ from 'lodash';

const EntityPropertyForm = ({lookup_property, customSlotTypes, onSave, onChange, loading, saving, errors}) => {
  let synonyms = '';
  _.each(lookup_property.synonyms, (synonym) => {
    if(synonyms.length > 0) {
      synonyms += `\n`;
    }
    synonyms += `${synonym}`;
  });
  const customSlotTypeOptions = [];
  _.each(customSlotTypes, function(customSlotType) {
    customSlotTypeOptions.push({
      value: customSlotType.name,
      text: customSlotType.name
    });
  });

  return (
    <form>
      <TextInput
        name="name"
        label="Property Name"
        value={lookup_property.name}
        onChange={onChange}
        error={errors.name}/>
      <SelectInput
        name="custom_slot_type"
        label="Custom Slot Type"
        value={lookup_property.custom_slot_type}
        onChange={onChange}
        error={errors.custom_slot_type}
        options={customSlotTypeOptions} />
      <TextArea
        name="synonyms"
        label="Synonyms"
        value={synonyms}
        onChange={onChange}
        error={errors.synonyms}
        width="12"
        rows="10"
      />
      <TextInput
        name="say_as"
        label="Say As"
        value={lookup_property.say_as}
        onChange={onChange}
        error={errors.say_as} />
      <TextInput
        name="display_as"
        label="Display As"
        value={lookup_property.display_as}
        onChange={onChange}
        error={errors.display_as} />
      <TextInput
        name="response_format"
        label="Response Format"
        value={lookup_property.response_format}
        onChange={onChange}
        error={errors.response_format} />
      <TextInput
        name="negative_response_format"
        label="Negative Response Format"
        value={lookup_property.negative_response_format}
        onChange={onChange}
        error={errors.negative_response_format} />
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

EntityPropertyForm.propTypes = {
  lookup_property: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  customSlotTypes: React.PropTypes.array.isRequired
};

export default EntityPropertyForm;
