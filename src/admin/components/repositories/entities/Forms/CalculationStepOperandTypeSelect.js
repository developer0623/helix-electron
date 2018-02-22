import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';

const CalculationStepOperandTypeSelect = ({step, rowIndex, onChange, errors}) => {
  const stepNameKey = "CalculationStepOperandType_" + rowIndex;

  function onChangeCalculationStep(event) {
    const field = event.target.name;

    return onChange(event, rowIndex, field);
  }
  return (
    <div className="flextable">
      <div className="flextable-item">
        <div className="radio">
          <label>
            <input
              name="operand_type"
              type="radio"
              value="variable"
              checked={step.operand_type == 'variable'}
              onChange={onChangeCalculationStep}
            />
            Variable
          </label>
        </div>
      </div>
      <div className="flextable-item">
        <div className="radio">
          <label>
            <input
              name="operand_type"
              type="radio"
              value="constant"
              checked={step.operand_type == 'constant'}
              onChange={onChangeCalculationStep} />
            Constant
          </label>
        </div>
      </div>
    </div>
  );
};

CalculationStepOperandTypeSelect.propTypes = {
  step: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default CalculationStepOperandTypeSelect;
