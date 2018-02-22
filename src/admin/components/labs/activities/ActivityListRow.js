import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import ActivitySlotListRow from './ActivitySlotListRow';

const ActivityListRow = ({activity}) => {
  return (
    <tr>
      <td>{activity.createdAt}</td>
      <td>{activity.type}</td>
      <td>{activity.intent_name}</td>
      <td>
        {activity.slots.map((slot, index) =>
          <ActivitySlotListRow
            key={index}
            slot={slot}
          />
        )}
      </td>
      <td></td>
    </tr>
  );
};

ActivityListRow.propTypes = {
  activity: PropTypes.object.isRequired
};

export default ActivityListRow;
