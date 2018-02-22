import React, {PropTypes} from 'react';
import TextInput from '../../../common/TextInput';

const ProtocolStepReminder = ({protocol_step, rowIndex, onChangeProtocolStep, errors}) => {
  function onChangeProtocolFieldAtIndex(index, field, event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    return onChangeProtocolStep(event, index, field, value);
  }
  function onChangeMinutesFieldAtIndex(event) {
    const field = event.target.name;
    const value = parseInt(event.target.value);

    return onChangeProtocolStep(event, rowIndex, field, value);
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <form className="form-inline">
            <TextInput
              label="Send a reminder after"
              name="reminder_minutes"
              value={protocol_step.reminder_minutes}
              onChange={onChangeMinutesFieldAtIndex}
              error={errors.protocol_steps}
              placeholder="Minutes"
              width="2"
            />
            Minutes
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <TextInput
            label="Reminder Copy"
            name="reminder_copy"
            value={protocol_step.reminder_copy}
            onChange={onChangeProtocolFieldAtIndex}
            error={errors.protocol_steps}
            placeholder="Enter The Copy Helix Will Send as a Reminder"
          />
        </div>
      </div>
    </div>
  );
};

ProtocolStepReminder.propTypes = {
  protocol_step: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onChangeProtocolStep: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default ProtocolStepReminder;
