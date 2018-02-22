import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const AccessTokenListRow = ({accessToken, onDeleteButtonClick}) => {
  function onDelete(accessToken, e) {
    onDeleteButtonClick(accessToken, e);
  }
  return (
    <tr>
      <td>{accessToken.client_id}</td>
      <td>
        <span>{accessToken.access_token}</span>
      </td>
      <td>{accessToken.refresh_token}</td>
      <td>{accessToken.access_token_expired_on}</td>
      <td>{accessToken.refresh_token_expires_on}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

AccessTokenListRow.propTypes = {
  accessToken: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default AccessTokenListRow;
