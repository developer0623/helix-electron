import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';

const CalculationInputVariable = ({inputVariable, rowIndex, onDeleteInputVariable, onChangeInputVariable, errors}) => {
  const stepNameKey = "CalculationInputVariable_" + rowIndex;

  function onChangeCalculationInputVariable(event) {
    const field = event.target.name;

    return onChangeInputVariable(event, rowIndex, field);
  }
  function onDeleteCalculationInputVariable(event) {
    return onDeleteInputVariable(event, rowIndex);
  }
  return (
    <div className="row">
      <div className="col-md-10">
        <div className="container">
          <div className="flextable mb-2">
            <div className="flextable-item flextable-primary">
              <h5>Input Variable {rowIndex + 1}</h5>
            </div>
            <div className="flextable-item">
              <button
                type="button"
                className="btn btn-xs btn-pill btn-primary"
                onClick={onDeleteCalculationInputVariable}>
                Remove Input Variable
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextInput
                name="name"
                label=""
                placeholder="Enter a name for the variable"
                value={inputVariable.name}
                onChange={onChangeCalculationInputVariable}
                error={errors.step}
              />
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

CalculationInputVariable.propTypes = {
  inputVariable: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onDeleteInputVariable: React.PropTypes.func.isRequired,
  onChangeInputVariable: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default CalculationInputVariable;
