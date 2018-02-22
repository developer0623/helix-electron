import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const CustomSlotListRow = ({applicationId, custom_slot, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(custom_slot, e);
  }

  return (
    <tr>
      <td><Link to={`/admin/applications/${applicationId}/settings/custom_slots/${custom_slot._id}`}>{custom_slot.name}</Link></td>
      <td>{custom_slot.synonyms}</td>
      <td>{custom_slot.custom_slot_value}</td>
      <td>{custom_slot.custom_slot_type}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

CustomSlotListRow.propTypes = {
  applicationId: PropTypes.string.isRequired,
  custom_slot: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default CustomSlotListRow;
