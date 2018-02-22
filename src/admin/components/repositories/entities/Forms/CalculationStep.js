import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';
import CalculationStepSelectType from './CalculationStepSelectType';
import CalculationStepOperationType from './CalculationStepOperationType';
import CalculationStepFunctionType from './CalculationStepFunctionType';
import _ from 'lodash';

const CalculationStep = ({calculation, step, rowIndex, onDeleteStep, onChangeStep, errors}) => {
  const stepNameKey = "CalculationStep_" + rowIndex;

  const inputVariables = _.map(calculation.input_variables, 'name');
  const functions = [
    "Molecular Weight"
  ];
  const renderIf = predicate => element => predicate && element;

  const isNoType = renderIf(step.step_type == '');
  const isOperationType = renderIf(step.step_type == 'operation');
  const isFunctionType = renderIf(step.step_type == 'function');

  function onDeleteCalculationStep(event) {
    return onDeleteStep(event, rowIndex);
  }
  return (
    <div className="row">
      <div className="col-md-10">
        <div className="container">
          <div className="flextable mb-2">
            <div className="flextable-item flextable-primary">
              <h5>Step {rowIndex + 1}</h5>
            </div>
            <div className="flextable-item">
              <button
                type="button"
                className="btn btn-xs btn-pill btn-primary"
                onClick={onDeleteCalculationStep}>
                Remove Step
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="flextable">
              {isNoType(
                <CalculationStepSelectType
                  step={step}
                  rowIndex={rowIndex}
                  onChange={onChangeStep}
                  errors={errors}
                />
              )}
              {isOperationType(
                <CalculationStepOperationType
                  step={step}
                  inputVariables={inputVariables}
                  rowIndex={rowIndex}
                  onChange={onChangeStep}
                  errors={errors}
                />
              )}
              {isFunctionType(
                <CalculationStepFunctionType
                  step={step}
                  inputVariables={inputVariables}
                  functions={functions}
                  rowIndex={rowIndex}
                  onChange={onChangeStep}
                  errors={errors}
                />
              )}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

CalculationStep.propTypes = {
  calculation: React.PropTypes.object.isRequired,
  step: React.PropTypes.object.isRequired,
  rowIndex: React.PropTypes.number.isRequired,
  onDeleteStep: React.PropTypes.func.isRequired,
  onChangeStep: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default CalculationStep;
