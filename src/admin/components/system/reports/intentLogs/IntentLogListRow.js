import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import IntentLogSlotItem from './IntentLogSlotItem';

const IntentListRow = ({intentLog, onDeleteButtonClick}) => {
  let userName = '';
  if(intentLog.user) {
    userName = intentLog.user.name;
  }
  return (
    <tr>
      <td><Link to={'/admin/intentLog/' + intentLog._id}>{intentLog.request_id.substr(intentLog.request_id.length - 10)}</Link></td>
      <td>{intentLog.type}</td>
      <td>{intentLog.intent_name}</td>
      <td>{intentLog.slots.map(slot =>
            <IntentLogSlotItem
              key={slot._id}
              slot={slot}
            />
          )}
      </td>
      <td>{userName}</td>
      <td>{intentLog.success ? 'Yes' : 'No'}</td>
      <td>{new Date(intentLog.createdAt).toLocaleString()}</td>
    </tr>
  );
};

IntentListRow.propTypes = {
  intentLog: PropTypes.object.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired
};

export default IntentListRow;
