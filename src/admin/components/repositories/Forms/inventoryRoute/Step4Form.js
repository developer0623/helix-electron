import React from 'react';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
import RepositoryTypeItem from '../RepositoryTypeItem';

const Step4Form = ({repository, onUploadInventoryClick, onInventoryFileChange, loading, saving, errors}) => {
  return (
    <div>
      <h5>{"Ok.  We've create an empty inventory for you. Now upload some inventory items to your inventory."}</h5>
      <form onSubmit={onUploadInventoryClick}>
        <input type="file" onChange={onInventoryFileChange}/>
        <button type="submit" onClick={onUploadInventoryClick}>Upload CSV</button>
      </form>
    </div>
  );
};

Step4Form.propTypes = {
  repository: React.PropTypes.object.isRequired,
  onUploadInventoryClick: React.PropTypes.func.isRequired,
  onInventoryFileChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default Step4Form;
