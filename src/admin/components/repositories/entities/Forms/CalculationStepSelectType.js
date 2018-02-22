import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';

const CalculationStepSelectType = ({step, rowIndex, onChange, errors}) => {
  const stepNameKey = "CalculationStepSelectType_" + rowIndex;

  function onChangeCalculationStepType(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    return onChange(event, rowIndex, field, value);
  }
  return (
    <form>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="operation"
            checked={step.step_type == 'operation'}
            onChange={onChangeCalculationStepType}
          />
          Operation
        </label>
      </div>
      <div className="radio">
        <label>
          <input type="radio"
            value="function"
            checked={step.step_type == 'function'}
            onChange={onChangeCalculationStepType}
          />
          Function
        </label>
      </div>
    </form>
  );
};

CalculationStepSelectType.propTypes = {
  step: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default CalculationStepSelectType;
