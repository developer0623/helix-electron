import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const ListItemTemplate = ({repository, entity, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(entity, e);
  }
  return (
    <tr>
      <td><Link to={`/admin/repositories/${repository._id}/entities/${entity._id}`}>{entity.name}</Link></td>
      <td>{entity.attributes.sub_title}</td>
      <td>{entity.attributes.url}</td>
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
