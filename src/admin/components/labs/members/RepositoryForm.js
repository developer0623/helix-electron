import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';

const DataSetForm = ({dataSet, onSave, onChange, loading, saving, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={dataSet.name}
        onChange={onChange}
        error={errors.name}
        placeholder="Enter Name of Data Set"
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

DataSetForm.propTypes = {
  dataSet: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default DataSetForm;
