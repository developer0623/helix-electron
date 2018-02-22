import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const LaboratoryProfileListRow = ({laboratory_profile, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(laboratory_profile, e);
  }
  return (
    <tr>
      <td><Link to={`/admin/organization/laboratory_profiles/${laboratory_profile._id}`}>{laboratory_profile.profile_name}</Link></td>
      <td>{`${laboratory_profile.street_address_1} ${laboratory_profile.city}, ${laboratory_profile.state} ${laboratory_profile.zip_code}`}</td>
      <td>{laboratory_profile.timezone}</td>
      <td>{laboratory_profile.createdAt}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

LaboratoryProfileListRow.propTypes = {
  laboratory_profile: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default LaboratoryProfileListRow;
