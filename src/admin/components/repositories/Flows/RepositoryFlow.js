import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

import Step1Form from '../Forms/repository/Step1Form';
import Step2Form from '../Forms/repository/Step2Form';
import Step3Form from '../Forms/repository/Step3Form';
import Step4Form from '../Forms/repository/Step4Form';

const RepositoryFlow = ({repository, repository_types, currentStep, onChange, errors, saving}) => {
  function onPrevious(e) {
    e.preventDefault();
  }
  function onNext(e) {
    e.preventDefault();
  }
  return (
    <form className="onboard-form add-flow">
      {currentStep == 1 && <Step1Form
        repository={repository}
        repository_types={repository_types}
        onChange={onChange}
        errors={errors}
        saving={saving}
      />}
      {currentStep == 2 && <Step2Form
        repository={repository}
        onChange={onChange}
        errors={errors}
        saving={saving}
      />}
      {currentStep == 3 && <Step3Form
        repository={repository}
        onChange={onChange}
        errors={errors}
        saving={saving}
      />}
      {currentStep == 4 && <Step4Form
        repository={repository}
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

RepositoryFlow.propTypes = {
  repository: PropTypes.object.isRequired,
  repository_types: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  saving: PropTypes.bool.isRequired
};

export default RepositoryFlow;
