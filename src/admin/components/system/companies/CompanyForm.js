import React from 'react';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';

const CompanyForm = ({company, onSave, onChange, loading, saving, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Company Name"
        value={company.name}
        onChange={onChange}
        error={errors.name}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

CompanyForm.propTypes = {
  company: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CompanyForm;
