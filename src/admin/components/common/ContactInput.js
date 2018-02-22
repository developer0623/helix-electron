import React, {PropTypes} from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import SelectInput from './SelectInput';

const ContactInput = ({contact, onChange, errors}) => {
  return (
    <div className="container-fluid"  style={{'paddingRight': '0px', 'paddingLeft': '0px'}}>
      <div className="row">
        <div className="col-md-6">
          <TextInput
            name="first_name"
            label="First Name"
            value={contact.first_name}
            placeholder="Enter First Name"
            onChange={onChange}
            error={errors.first_name} />
        </div>
        <div className="col-md-6">
          <TextInput
            name="last_name"
            label="Last Name"
            value={contact.last_name}
            placeholder="Enter Last Name"
            onChange={onChange}
            error={errors.last_name} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TextInput
            name="email_address"
            label="Email Address"
            value={contact.email_address}
            placeholder="Enter Email Address"
            onChange={onChange}
            error={errors.email_address} />
        </div>
        <div className="col-md-6">
          <TextInput
            name="phone_number"
            label="Phone Number"
            value={contact.phone_number}
            placeholder="Enter Phone Number"
            onChange={onChange}
            error={errors.phone_number} />
        </div>
      </div>
    </div>
  );
};
ContactInput.propTypes = {
  contact: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default ContactInput;
