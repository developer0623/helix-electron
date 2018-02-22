import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const PropertyListRow = ({repository, property, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(e, property);
  }
  return (
    <tr>
      <td><Link to={`/admin/organizations/${repository._id}/properties/${property._id}`}>{property.name}</Link></td>
      <td>{property.custom_slot_type}</td>
      <td>{property.synonyms}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

PropertyListRow.propTypes = {
  repository: PropTypes.object.isRequired,
  property: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default PropertyListRow;
