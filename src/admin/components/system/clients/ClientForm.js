import React from 'react';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';

const ClientForm = ({client, onSave, onChange, loading, saving, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Client Name"
        value={client.name}
        onChange={onChange}
        error={errors.name}/>

      <TextInput
        name="client_id"
        label="Client Id"
        value={client.client_id}
        onChange={onChange}
        error={errors.client_id}/>

      <TextInput
        name="secret"
        label="Secret"
        value={client.secret}
        onChange={onChange}
        error={errors.secret}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

ClientForm.propTypes = {
  client: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ClientForm;
