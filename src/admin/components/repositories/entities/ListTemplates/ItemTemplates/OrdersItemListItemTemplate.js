import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

const ListItemTemplate = ({repository, entity, onDeleteButtonClick}) => {
  if(!entity.attributes) {
    entity.attributes = {};
  }
  if(!entity.attributes.properties) {
    entity.attributes.properties = {};
  }
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
      <td><Link to={`/admin/ordering/entities/${entity._id}`}>{entity.name}</Link></td>
      <td>{getValue("Vendor")}</td>
      <td>{getValue("Catalog Number")}</td>
      <td>{getValue("Location")}</td>
      <td>{entity.createdAt}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};
ListItemTemplate.propTypes = {
  repository: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default ListItemTemplate;
