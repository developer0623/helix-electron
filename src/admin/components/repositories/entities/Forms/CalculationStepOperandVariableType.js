import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';
import _ from 'lodash';

const CalculationStepOperandVariableType = ({step, rowIndex, operandVariables, onChange, errors}) => {
  const stepNameKey = "CalculationSetupStep_" + rowIndex;
  const operandVariableOptions = [];
  _.each(operandVariables, function(operandVariable) {
    operandVariableOptions.push({
      value: operandVariable,
      text: operandVariable
    });
  });
  _.times(rowIndex, function(index){
    operandVariableOptions.push({
      value: "Result " + (index + 1),
      text: "Result " + (index + 1)
    });
  });
  function onChangeCalculationStep(event) {
    const field = event.target.name;

    return onChange(event, rowIndex, field);
  }
  return (
    <div>
      <SelectInput
        key={"operand_" + stepNameKey}
        name={"operand_" + stepNameKey}
        value={step.operand}
        onChange={onChangeCalculationStep}
        error={errors.calculation_steps}
        options={operandVariableOptions} />
    </div>
  );
};

CalculationStepOperandVariableType.propTypes = {
  step: React.PropTypes.object.isRequired,
  rowIndex: React.PropTypes.number.isRequired,
  operandVariables: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default CalculationStepOperandVariableType;
