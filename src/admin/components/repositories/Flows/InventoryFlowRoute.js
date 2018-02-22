import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

import Step1Form from '../Forms/inventoryRoute/Step1Form';
import Step2Form from '../Forms/inventoryRoute/Step2Form';
import Step3Form from '../Forms/inventoryRoute/Step3Form';
import Step4Form from '../Forms/inventoryRoute/Step4Form';
import Step5Form from '../Forms/inventoryRoute/Step5Form';

const InventoryFlowRoute = ({repository, currentStep, onChange, onSave, onComplete, onPreviousClick, onNextClick, onUploadInventoryClick, onInventoryFileChange, errors, saving}) => {
  const numberOfSteps = 2;

  function onPrevious(e) {
    if(currentStep > 1) {
      onPreviousClick(e);
    }
  }
  function onNext(e) {
    if(currentStep == 1) {
      onSave(e);
    } else if (currentStep == numberOfSteps) {
      onNextClick(e);
    } else {
      onComplete(e);
    }
  }
  return (
    <form className="onboard-form add-flow">
      {currentStep == 1 && <Step1Form
        repository={repository}
        onChange={onChange}
        errors={errors}
        saving={saving}
      />}
      {currentStep == 2 && <Step2Form
        repository={repository}
        onChange={onChange}
        onNext={onNext}
        errors={errors}
        saving={saving}
      />}{currentStep == 3 && <Step3Form
      repository={repository}
      onChange={onChange}
      errors={errors}
      saving={saving}
    />}{currentStep == 4 && <Step4Form
      repository={repository}
      onUploadInventoryClick={onUploadInventoryClick}
      onInventoryFileChange={onInventoryFileChange}
      onChange={onChange}
      errors={errors}
      saving={saving}
    />}
      <div className="footer-wrapper">
        <button type="submit" className="button previous" onClick={onPrevious}>
          <i className="icons icon-arrow-left" />
          Previous
        </button>
        <button type="submit" className="button continue" onClick={onNext}>
          Next
          <i className="icons icon-arrow-right" />
        </button>
      </div>
    </form>
  );
};

InventoryFlowRoute.propTypes = {
  repository: PropTypes.object.isRequired,
  currentStep: PropTypes.number.isRequired,
  onUploadInventoryClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  saving: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onInventoryFileChange: PropTypes.func.isRequired
};

export default InventoryFlowRoute;
