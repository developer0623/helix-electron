import React from 'react';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import SelectInput from '../SelectInput';

const RepositoryForm = ({repository, onSave, onChange, loading, saving, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={repository.name}
        onChange={onChange}
        error={errors.name}
        placeholder="Enter Name of Repository"
        width="12" />
      <div className="row">
        <div className="col-md-12">
          <div className="footer-wrapper">
            <button
              type="submit"
              disabled={saving}
              className="button continue"
              onClick={onSave}>
                Save
                <i className="icons icon-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

RepositoryForm.propTypes = {
  repository: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default RepositoryForm;
