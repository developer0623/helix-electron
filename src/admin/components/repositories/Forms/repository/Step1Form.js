import React from 'react';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
import RepositoryTypeItem from '../RepositoryTypeItem';
import _ from 'lodash';

const Step1Form = ({repository, repository_types, onChange, loading, saving, errors}) => {
  const repositoryTypeOptions = [];
  _.each(repository_types, function(repository_type) {
    repositoryTypeOptions.push({
      value: repository_type._id,
      text: repository_type.type_name
    });
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h6>Give your new repository a name.</h6>
          <TextInput
            name="name"
            placeholder="Enter the name of the repository"
            value={repository.name}
            onChange={onChange}
            error={errors.name}
          />
          <div className="notes">List a couple good examples here.</div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h6>What type of items do you want to store in your repository?</h6>
          <SelectInput
            name="repository_type"
            value={repository.repository_type}
            onChange={onChange}
            error={errors.repository_type}
            options={repositoryTypeOptions} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h6>{"Write a brief description of what's in this repository."}</h6>
          <TextArea
            name="description"
            value={repository.description}
            onChange={onChange}
            error={errors.description}
            rows="6"
          />
          <div className="notes">This can be helpful to others in your lab to identify what is in this inventory.</div>
        </div>
      </div>
    </div>
  );
};

Step1Form.propTypes = {
  repository: React.PropTypes.object.isRequired,
  repositoryTypes: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  repository_types: React.PropTypes.object.isRequired
};

export default Step1Form;
