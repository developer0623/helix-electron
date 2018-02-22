import React from 'react';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';
import CalculationInputVariable from './CalculationInputVariable';
import CalculationStep from './CalculationStep';
import _ from 'lodash';

const CalculatorForm = ({entity, intents, onAppendInputVariable, onDeleteInputVariable, onChangeInputVariable, onAppendCalculationStep, onDeleteCalculationStep, onChangeCalculationStep, onSave, onChange, loading, saving, errors}) => {
  const unitOptions = [{
    value: "grams",
    text: "Grams"
  }, {
    value: "liters",
    text: "Liters"
  }, {
    value: "mol/L",
    text: "mol/L"
  }];
  const intentOptions = [];
  _.each(intents, function(intent) {
    intentOptions.push({
      value: intent.term,
      text: intent.term
    });
  });
  return (
    <form>
      <TextInput
        name="name"
        label="Calculation Name"
        value={entity.name}
        onChange={onChange}
        error={errors.name}/>
      <SelectInput
        key="intent"
        name="intent"
        label="Intent"
        value={entity.intent}
        onChange={onChange}
        error={errors.intent}
        options={intentOptions} />
      <input
        type="checkbox"
        name="private"
        checked={entity.private}
        onChange={onChange} /> Keep calculation private
      <hr />
      <div className="flextable mb-2">
        <div className="flextable-item flextable-primary">
          <h4>Input Variables</h4>
       </div>
        <div className="flextable-item">
          <input
            type="submit"
            className="btn btn-primary btn-pill"
            onClick={onAppendInputVariable}
            value="Add Input Variable" />
        </div>
      </div>
      <hr />
      <div className="container-fluid pl-0">
      {entity.attributes.input_variables.map((input_variable, index) =>
        <CalculationInputVariable
          key={index}
          inputVariable={input_variable}
          rowIndex={index}
          onChangeInputVariable={onChangeInputVariable}
          onDeleteInputVariable={onDeleteInputVariable}
          errors={errors}
         />
      )}
      </div>
      <div className="flextable mb-2">
        <div className="flextable-item flextable-primary">
          <h4>Steps</h4>
        </div>
        <div className="flextable-item">
          <input
            type="submit"
            className="btn btn-primary btn-pill"
            onClick={onAppendCalculationStep}
            value="Add Step" />
        </div>
      </div>
      <hr />
      <div className="container-fluid pl-0">
      {entity.attributes.steps.map((step, index) =>
        <CalculationStep
          key={index}
          calculation={entity}
          step={step}
          rowIndex={index}
          onChangeStep={onChangeCalculationStep}
          onDeleteStep={onDeleteCalculationStep}
          errors={errors}
         />
      )}
      </div>
      <h4>Results</h4>
      <SelectInput
        key="result_units"
        name="result_units"
        label="Result Units"
        value={entity.result_units}
        onChange={onChange}
        error={errors.result_units}
        options={unitOptions} />
      <TextInput
        name="instructions"
        label="Instructions"
        value={entity.instructions}
        onChange={onChange}
        error={errors.instructions}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

CalculatorForm.propTypes = {
  entity: React.PropTypes.object.isRequired,
  intents: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onAppendInputVariable: React.PropTypes.func.isRequired,
  onDeleteInputVariable: React.PropTypes.func.isRequired,
  onChangeInputVariable: React.PropTypes.func.isRequired,
  onAppendCalculationStep: React.PropTypes.func.isRequired,
  onDeleteCalculationStep: React.PropTypes.func.isRequired,
  onChangeCalculationStep: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CalculatorForm;
