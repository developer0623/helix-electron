import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const EntityListRow = ({companyId, labId, type, dataSetId, repositoryId, entity, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(entity, e);
  }
  let companyName;
  if(entity.owner) {
    companyName = entity.owner.name;
  }
  return (
    <tr>
      <td><Link to={`/admin/organizations/${companyId}/labs/${labId}/${type}/${repositoryId}/entities/${entity._id}`}>{entity.name}</Link></td>
      <td>{entity.say_as}</td>
      <td>{entity.synonyms}</td>
      <td>{companyName}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

EntityListRow.propTypes = {
  companyId: PropTypes.string.isRequired,
  labId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataSetId: PropTypes.string.isRequired,
  repositoryId: PropTypes.string.isRequired,
  entity: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default EntityListRow;
