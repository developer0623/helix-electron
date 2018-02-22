import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';
import _ from 'lodash';

const CalculationStepFunctionType = ({step, inputVariables, functions, rowIndex, onChange, errors}) => {
  const stepNameKey = "CalculationSetupStep_" + rowIndex;
  const inputVariableOptions = [];
  _.each(inputVariables, function(inputVariable) {
    inputVariableOptions.push({
      value: inputVariable,
      text: inputVariable
    });
  });
  const functionOptions = [{
      value: "molecular_weight",
      text: "Molecular Weight"
    }, {
      value: "round",
      text: "Round"
    }
  ];
  function onChangeCalculationStep(event) {
    const field = event.target.name;

    return onChange(event, rowIndex, field);
  }
  return (
    <div className="flextable">
      <div className="flextable-item">
        <SelectInput
          key={"inputVariable_" + stepNameKey}
          name="inputVariable"
          value={step.input_variable}
          onChange={onChangeCalculationStep}
          error={errors.calculation_steps}
          options={inputVariableOptions} />
      </div>
      <div className="flextable-item">
        <SelectInput
          key={"function_" + stepNameKey}
          name="function"
          value={step.function}
          onChange={onChangeCalculationStep}
          error={errors.calculation_steps}
          options={functionOptions} />
      </div>
      <div className="flextable-item">
        {'= Result' + (rowIndex + 1)}
      </div>
    </div>
  );
};

CalculationStepFunctionType.propTypes = {
  step: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  inputVariables: React.PropTypes.array.isRequired,
  functions: React.PropTypes.array.isRequired,
  errors: React.PropTypes.object
};

export default CalculationStepFunctionType;
