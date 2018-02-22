import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import IntentSlotListRow from './IntentSlotListRow';

import _ from 'lodash';

const IntentForm = ({intent, onSave, onChange, onAppendSlot, onChangeSlot, onDeleteSlot, customSlotTypes, loading, saving, errors}) => {
  let samples = '';
  _.each(intent.samples, (sample) => {
    if(samples.length > 0) {
      samples += `\n`;
    }
    samples += `${sample}`;
  });
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={intent.name}
        onChange={onChange}
        error={errors.name}/>
        <input
          type="checkbox"
          name="is_built_in"
          checked={intent.is_built_in}
          onChange={onChange} />
        <label>Is Built-In</label>
      <TextArea
        name="samples"
        label="Sample Utterance"
        value={samples}
        onChange={onChange}
        error={errors.synonyms}
        placeholder="Sample Utterances"
        width="12"
        rows="32"
      />
      <div className="flextable mb-2">
        <div className="flextable-item flextable-primary">
          <h4>Slots</h4>
        </div>
        <div className="flextable-item">
          <input
            type="submit"
            className="btn btn-primary btn-pill"
            onClick={onAppendSlot}
            value="Add Slot" />
        </div>
      </div>
      <hr />
        <div className="container-fluid pl-0">
        {intent.slots.map((slot, index) =>
          <IntentSlotListRow
            key={index}
            slot={slot}
            rowIndex={index}
            onChangeSlot={onChangeSlot}
            onDeleteSlot={onDeleteSlot}
            customSlotTypes={customSlotTypes}
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
    </form>
  );
};

IntentForm.propTypes = {
  intent: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onAppendSlot: React.PropTypes.func.isRequired,
  onChangeSlot: React.PropTypes.func.isRequired,
  onDeleteSlot: React.PropTypes.func.isRequired,
  customSlotTypes: React.PropTypes.array.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default IntentForm;
