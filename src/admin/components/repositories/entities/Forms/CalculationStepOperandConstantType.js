import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';
import CalculationStepOperandTypeSelect from './CalculationStepOperandTypeSelect';

const CalculationStepOperandConstantType = ({step, rowIndex, onChange, errors}) => {
  const stepNameKey = "CalculationSetupStep_" + rowIndex;

  function onChangeCalculationStep(event) {
    const field = event.target.name;

    return onChange(event, rowIndex, field);
  }
  return (
    <div>
      <TextInput
        name="constant"
        label=""
        placeholder="Enter value"
        value={step.constant}
        onChange={onChangeCalculationStep}
        error={errors.step}
      />
    </div>
  );
};

CalculationStepOperandConstantType.propTypes = {
  step: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default CalculationStepOperandConstantType;
