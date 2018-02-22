import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import _ from 'lodash';

const CustomSlotTypeForm = ({customSlotType, onSave, onChange, loading, saving, errors}) => {
  let values = '';
  _.each(customSlotType.values, (value) => {
    if(values.length > 0) {
      values += `\n`;
    }
    values += `${value}`;
  });
  return (
    <form>
      <TextInput
        name="name"
        label="Custom Slot Type Name"
        value={customSlotType.name}
        onChange={onChange}
        error={errors.name}/>
      <TextArea
        name="values"
        label="Values"
        value={values}
        onChange={onChange}
        error={errors.values}
        placeholder="Custom Slot Values"
        width="12"
        rows="20"
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

CustomSlotTypeForm.propTypes = {
  customSlotType: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CustomSlotTypeForm;
