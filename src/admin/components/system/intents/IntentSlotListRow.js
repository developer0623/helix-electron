import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import _ from 'lodash';

const IntentSlotListRow = ({slot, rowIndex, onChangeSlot, onDeleteSlot, errors, customSlotTypes}) => {
  let prompts = '';
  _.each(slot.prompts, (prompt) => {
    if(prompts.length > 0) {
      prompts += `\n`;
    }
    prompts += `${prompt}`;
  });
  let utterances = '';
  _.each(slot.utterances, (utterance) => {
    if(utterances.length > 0) {
      utterances += `\n`;
    }
    utterances += `${utterance}`;
  });
  const customSlotTypeOptions = [];
  _.each(customSlotTypes, function(customSlotType) {
    customSlotTypeOptions.push({
      value: customSlotType._id,
      text: customSlotType.name
    });
  });
  function onDeleteRow(e) {
    onDeleteSlot(rowIndex, e);
  }
  function onChangeFieldAtIndex(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    return onChangeSlot(event, rowIndex, field, value);
  }
  return (
    <div className="row">
      <div className="col-md-10">
        <div className="container">
          <div className="flextable mb-2">
            <div className="flextable-item flextable-primary">
              <h5>Slot {rowIndex + 1}</h5>
            </div>
            <div className="flextable-item">
              <button type="button" className="btn btn-xs btn-pill btn-primary" onClick={onDeleteRow}>Delete Slot</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextInput
                name="name"
                label="Name"
                value={slot.name}
                onChange={onChangeFieldAtIndex}
                error={errors.intent_slot_name}
                placeholder="Enter Slot Name"
                data-index={rowIndex} />
              <SelectInput
                name="custom_slot_type"
                label="Type"
                value={slot.custom_slot_type._id}
                onChange={onChangeFieldAtIndex}
                error={errors.type}
                options={customSlotTypeOptions} />
              <input
                type="checkbox"
                name="required"
                checked={slot.required}
                onChange={onChangeFieldAtIndex} /> required
              <TextArea
                name="prompts"
                label="Sample Prompts"
                value={prompts}
                onChange={onChangeFieldAtIndex}
                error={errors.prompts}
                placeholder="Sample Prompts"
                width="12"
                rows="12"
              />
              <TextArea
                name="utterances"
                label="Sample Utterances"
                value={utterances}
                onChange={onChangeFieldAtIndex}
                error={errors.utterances}
                placeholder="Sample Utterances"
                width="12"
                rows="12"
              />
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

IntentSlotListRow.propTypes = {
  slot: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onDeleteSlot: React.PropTypes.func.isRequired,
  onChangeSlot: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object,
  customSlotTypes: React.PropTypes.array.isRequired
};

export default IntentSlotListRow;
