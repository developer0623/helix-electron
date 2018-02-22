import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import IntentUtteranceItem from './IntentUtteranceItem';
import AssociatedTypeItem from './AssociatedTypeItem';

const IntentListRow = ({intent, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(intent, e);
  }
  return (
    <tr>
      <td><Link to={'/admin/system/intents/' + intent._id}>{intent.name}</Link></td>
      <td>{(intent.is_built_in) ? "Yes" : "No"}</td>
      <td>{
        intent.samples.map(utterance =>
            <IntentUtteranceItem key={utterance} utterance={utterance}/>
          )}
      </td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

IntentListRow.propTypes = {
  intent: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default IntentListRow;
