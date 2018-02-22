import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const ClientListRow = ({client, onDeleteButtonClick}) => {
  function onDelete(client, e) {
    onDeleteButtonClick(client, e);
  }
  return (
    <tr>
      <td><Link to={'/admin/system/clients/' + client._id}>{client.name}</Link></td>
      <td>{client.client_id}</td>
      <td>{client.secret}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

ClientListRow.propTypes = {
  client: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default ClientListRow;
