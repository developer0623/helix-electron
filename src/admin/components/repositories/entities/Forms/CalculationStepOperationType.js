import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';
import CalculationStepOperandTypeSelect from './CalculationStepOperandTypeSelect';
import CalculationStepOperandConstantType from './CalculationStepOperandConstantType';
import CalculationStepOperandVariableType from './CalculationStepOperandVariableType';
import _ from 'lodash';

const CalculationStepOperationType = ({step, inputVariables, rowIndex, onChange, errors}) => {
  const stepNameKey = "CalculationSetupStep_" + rowIndex;
  const inputVariableOptions = [];
  _.each(inputVariables, function(inputVariable) {
    inputVariableOptions.push({
      value: inputVariable,
      text: inputVariable
    });
  });
  _.times(rowIndex, function(index){
    inputVariableOptions.push({
      value: "Result " + (index + 1),
      text: "Result " + (index + 1)
    });
  });
  const operationOptions = [{
      value: "add",
      text: "Add"
    }, {
      value: "divide",
      text: "Divide"
    }, {
      value: "multiply",
      text: "Multiply"
    }, {
      value: "subtract",
      text: "Subtract"
    }
  ];
  const renderIf = predicate => element => predicate && element;

  const isNoOperand = renderIf(step.operand_type == '');
  const isConstantOperand = renderIf(step.operand_type == 'constant');
  const isVariableOperand = renderIf(step.operand_type == 'variable');

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
          key={"operation_" + stepNameKey}
          name="operation"
          value={step.operation}
          onChange={onChangeCalculationStep}
          error={errors.calculation_steps}
          options={operationOptions} />
      </div>
      <div className="flextable-item">
        {isNoOperand(
          <CalculationStepOperandTypeSelect
            step={step}
            rowIndex={rowIndex}
            onChange={onChange}
            errors={errors}
          />
        )}
        {isConstantOperand(
          <CalculationStepOperandConstantType
            step={step}
            rowIndex={rowIndex}
            onChange={onChange}
            errors={errors}
          />
        )}
        {isVariableOperand(
          <CalculationStepOperandVariableType
            step={step}
            rowIndex={rowIndex}
            operandVariables={inputVariables}
            onChange={onChange}
            errors={errors}
          />
        )}
      </div>
      <div className="flextable-item">
        {'= Result' + (rowIndex + 1)}
      </div>
    </div>
  );
};

CalculationStepOperationType.propTypes = {
  step: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  inputVariables: React.PropTypes.array.isRequired,
  errors: React.PropTypes.object
};

export default CalculationStepOperationType;
