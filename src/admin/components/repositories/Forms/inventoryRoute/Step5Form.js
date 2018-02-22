import React from 'react';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';

const Step5Form = ({repository, onSave, onChange, loading, saving, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={repository.name}
        onChange={onChange}
        error={errors.name}
        placeholder="Enter Name of Repository"
        width="8" />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />
    </form>
  );
};

Step5Form.propTypes = {
  repository: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default Step5Form;
