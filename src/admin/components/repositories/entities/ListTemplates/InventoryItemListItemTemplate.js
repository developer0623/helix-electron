import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

const InventoryItemListItemTemplate = ({repository, entity, onDeleteButtonClick}) => {
  const properties = _.keyBy(entity.attributes.properties, "key");

  function getValue(key) {
    if(properties[key]) {
      return properties[key].value;
    }

    return "";
  }
  function onDelete(e) {
    onDeleteButtonClick(entity, e);
  }
  return (
    <tr>
      <td><Link to={`/admin/inventories/entities/${entity._id}`}>{entity.name}</Link></td>
      <td>{getValue("Vendor")}</td>
      <td>{getValue("Serial Number")}</td>
      <td>{getValue("Location")}</td>
      <td>{getValue("Sub-Location")}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

InventoryItemListItemTemplate.propTypes = {
  repository: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default InventoryItemListItemTemplate;
