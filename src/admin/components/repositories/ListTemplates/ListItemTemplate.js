import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const ListItemTemplate = ({repository, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(repository, e);
  }
  return (
    <tr>
      <td style={{'width': '100%'}}><Link to={`${location.pathname}/entities`}>{repository.name}</Link></td>
    </tr>
  );
};

ListItemTemplate.propTypes = {
  repository: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default ListItemTemplate;
