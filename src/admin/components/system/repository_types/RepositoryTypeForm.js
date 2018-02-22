import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import IntentListRow from './IntentListRow';
import _ from 'lodash';

const RepositoryTypeForm = ({repositoryType, intents, onSave, onUpdateSelectedIntent, onAddIntent, onRemoveIntent, onChange, loading, saving, errors}) => {
  const intentOptions = [];
  _.each(intents, function(intent) {
    intentOptions.push({
      value: intent._id,
      text: intent.name
    });
  });
  return (
    <form>
      <TextInput
        name="type_name"
        label="Repository Type Name"
        value={repositoryType.type_name}
        onChange={onChange}
        error={errors.type_name}/>
      <TextInput
        name="slot_type"
        label="Slot Type"
        value={repositoryType.slot_type}
        onChange={onChange}
        error={errors.slot_type}/>
      <h4>Intents</h4>
      <table className="table">
        <thead>
        <tr>
          <th className="header">Name</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {repositoryType.intents.map(intent =>
          <IntentListRow key={intent._id}
            intent={intent}
            onRemoveIntent={onRemoveIntent}  />
        )}
        </tbody>
      </table>
      <hr />
      <div className="flextable mb-2">
        <div className="flextable-item flextable-primary">
          <SelectInput
            key="intent"
            name="intent"
            error={errors.intents}
            options={intentOptions}
            onChange={onUpdateSelectedIntent} />
        </div>
        <div className="flextable-item">
          <input
            type="submit"
            className="btn btn-primary btn-pill"
            value="Add Intent"
            onClick={onAddIntent} />
        </div>
        <input
          type="submit"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
          className="btn btn-primary"
          onClick={onSave}/>
      </div>
    </form>
  );
};

RepositoryTypeForm.propTypes = {
  repositoryType: React.PropTypes.object.isRequired,
  intents: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onRemoveIntent: React.PropTypes.func.isRequired,
  onUpdateSelectedIntent: React.PropTypes.func.isRequired,
  onAddIntent: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default RepositoryTypeForm;
