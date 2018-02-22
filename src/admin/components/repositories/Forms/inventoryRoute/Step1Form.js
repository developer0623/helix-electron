import React from 'react';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
import RepositoryTypeItem from '../RepositoryTypeItem';

const Step1Form = ({repository, onChange, saving, errors}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h6>Give your inventory a name</h6>
          <TextInput
            name="name"
            value={repository.name}
            onChange={onChange}
            error={errors.name}
            placeholder="Enter Name of Inventory"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h6>{"Write a brief description of what's in this inventory."}</h6>
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
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default Step1Form;
