import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const IntentListRow = ({intent, onRemoveIntent}) => {
  function removeIntent(e) {
    onRemoveIntent(e, intent);
  }
  return (
    <tr>
      <td>{intent.name}</td>
      <td><a href="#" onClick={removeIntent}>Delete</a></td>
    </tr>
  );
};

IntentListRow.propTypes = {
  intent: PropTypes.object.isRequired,
  onRemoveIntent: React.PropTypes.func.isRequired
};

export default IntentListRow;
