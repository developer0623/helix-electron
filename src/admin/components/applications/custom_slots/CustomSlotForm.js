import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';

import _ from 'lodash';

const CustomSlotForm = ({customSlot, customSlotTypes, onSave, onChange, loading, saving, errors}) => {
  let synonyms = '';
  _.each(customSlot.synonyms, (synonym) => {
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
      <SelectInput
        name="custom_slot_type"
        label="Custom Slot Type"
        value={customSlot.custom_slot_type}
        onChange={onChange}
        error={errors.custom_slot_type}
        options={customSlotTypeOptions} />

      <TextInput
        name="name"
        label="Custom Slot Name"
        value={customSlot.name}
        onChange={onChange}
        error={errors.name}/>

      <TextInput
        name="custom_slot_value"
        label="Custom Slot Value"
        value={customSlot.custom_slot_value}
        onChange={onChange}
        error={errors.custom_slot_value}/>

      <TextArea
        name="synonyms"
        label="Synonyms"
        value={synonyms}
        onChange={onChange}
        error={errors.synonyms}
        placeholder="Say As"
        width="12"
        rows="10"
      />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};
CustomSlotForm.propTypes = {
  customSlot: React.PropTypes.object.isRequired,
  customSlotTypes: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CustomSlotForm;
