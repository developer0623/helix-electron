import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const CustomSlotTypeListRow = ({customSlotType, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(customSlotType, e);
  }
  return (
    <tr>
      <td><Link to={'/admin/system/custom_slot_types/' + customSlotType._id}>{customSlotType._id}</Link></td>
      <td>{customSlotType.name}</td>
      <td></td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

CustomSlotTypeListRow.propTypes = {
  customSlotType: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default CustomSlotTypeListRow;
