import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';

const ProtocolSetupStepListRow = ({protocolSetupStep, rowIndex, onAppendProtocolSetupStepInput, onDeleteProtocolSetupStepInput, onChangeProtocolSetupStep, errors}) => {
  const stepNameKey = "ProtocolSetupStep_" + rowIndex;

  function onDeleteProtocolSetupStep(e) {
    onDeleteProtocolSetupStepInput(rowIndex, e);
  }
  function onChangeProtocolFieldAtIndex( event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    return onChangeProtocolSetupStep(event, rowIndex, field, value);
  }
  return (
    <div className="row">
      <div className="col-md-10">
        <div className="container">
          <div className="flextable mb-2">
            <div className="flextable-item flextable-primary">
              <h5>Setup Step {rowIndex + 1}</h5>
            </div>
            <div className="flextable-item">
              <button
                type="button"
                className="btn btn-xs btn-pill btn-primary"
                onClick={onDeleteProtocolSetupStep}>
                  Remove Step
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextInput
                key={stepNameKey}
                name="name"
                value={protocolSetupStep.name}
                onChange={onChangeProtocolFieldAtIndex}
                error={errors.protocol_setup_steps}
                placeholder="Enter Step Copy"
                data-index={rowIndex} />
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

ProtocolSetupStepListRow.propTypes = {
  protocolSetupStep: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onAppendProtocolSetupStepInput: React.PropTypes.func.isRequired,
  onDeleteProtocolSetupStepInput: React.PropTypes.func.isRequired,
  onChangeProtocolSetupStep: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default ProtocolSetupStepListRow;
