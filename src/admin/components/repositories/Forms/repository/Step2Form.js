import React from 'react';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
import RepositoryTypeItem from '../RepositoryTypeItem';

const Step2Form = ({repository_types, selectRepositoryType, onSave, onChange, loading, saving, errors}) => {
  return (
    <form>
      <h6>Select a Repository Type</h6>
      {repository_types.map(repositoryType =>
        <RepositoryTypeItem key={repositoryType._id} repositoryType={repositoryType} selectRepositoryType={selectRepositoryType}/>
      )}
    </form>
  );
};

Step2Form.propTypes = {
  repositoryTypes: React.PropTypes.array.isRequired,
  selectRepositoryType: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  repository_types: React.PropTypes.object.isRequired

};

export default Step2Form;
