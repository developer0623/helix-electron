import React, {PropTypes} from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import SelectInput from './SelectInput';
import UnitedStatesList from './UnitedStatesList';

const AddressInput = ({address, label, onChange, value, errors}) => {
  return (
    <div className="container-fluid" style={{'paddingRight': '0px', 'paddingLeft': '0px'}}>
      <div className="row">
        <div className="col-md-12">
          <TextInput
            name="address_1"
            label="Street Address 1"
            value={address.address_1}
            placeholder="Enter Street Address 1"
            onChange={onChange}
            error={errors.address_1} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <TextInput
            name="address_2"
            label="Street Address 2"
            value={address.address_2}
            placeholder="Enter Street Address 2"
            onChange={onChange}
            error={errors.address_2} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TextInput
            name="city"
            label="City"
            value={address.city}
            placeholder="Enter City"
            onChange={onChange}
            error={errors.city} />
        </div>
        <div className="col-md-3">
          <UnitedStatesList
            name="state"
            label="State"
            value={address.state}
            placeholder="Enter State"
            onChange={onChange}
            error={errors.state}
          />
        </div>
        <div className="col-md-2">
          <TextInput
            name="zip_code"
            label="Zip Code"
            value={address.zip_code}
            placeholder="Enter Zip Code"
            onChange={onChange}
            error={errors.zip_code} />
        </div>
      </div>
    </div>
  );
};

AddressInput.propTypes = {
  address: PropTypes.object.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  errors: PropTypes.array
};

export default AddressInput;
