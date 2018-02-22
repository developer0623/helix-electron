import React from 'react';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';
import _ from 'lodash';

const UserForm = ({user, companies, onSave, onChange, loading, saving, errors}) => {
  const userTypeOptions = [{
    value: 'Administrator',
    text: 'Administrator'
  }, {
    value: 'Organization',
    text: 'Organization'
  }, {
    value: 'Customer',
    text: 'Customer'
  }];
  const companyOptions = [];
  _.each(companies, function(company) {
    companyOptions.push({
      value: company._id,
      text: company.name
    });
  });
  return (
    <form>
      <SelectInput
        name="user_type"
        label="User Type"
        value={user.user_type}
        error={errors.user_type}
        options={userTypeOptions}
        onChange={onChange} />

      <TextInput
        name="first_name"
        label="First Name"
        value={user.first_name}
        onChange={onChange}
        error={errors.first_name}/>

      <TextInput
        name="last_name"
        label="Last Name"
        value={user.last_name}
        onChange={onChange}
        error={errors.last_name}/>

      <SelectInput
        key="company"
        name="company"
        label="Company"
        value={(user.company) ? user.company._id : null}
        error={errors.company}
        options={companyOptions}
        onChange={onChange} />

      <TextInput
        name="email_address"
        label="Email Address"
        value={user.email_address}
        onChange={onChange}
        error={errors.email_address}/>

      <TextInput
        name="password"
        label="Password"
        value={user.password}
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

UserForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  companies: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default UserForm;
