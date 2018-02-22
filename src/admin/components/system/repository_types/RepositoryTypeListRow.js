import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const RepositoryTypeListRow = ({repositoryType, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(repositoryType, e);
  }
  return (
    <tr>
      <td><Link to={'/admin/system/repository_types/' + repositoryType._id}>{repositoryType._id}</Link></td>
      <td>{repositoryType.type_name}</td>
      <td>{repositoryType.slot_type}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

RepositoryTypeListRow.propTypes = {
  repositoryType: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default RepositoryTypeListRow;
