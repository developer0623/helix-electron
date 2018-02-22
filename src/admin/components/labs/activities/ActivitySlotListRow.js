import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const ActivitySlotListRow = ({slot}) => {
  return (
    <div>
      {slot.key}: {slot.value}
    </div>
  );
};

ActivitySlotListRow.propTypes = {
  slot: PropTypes.object.isRequired
};

export default ActivitySlotListRow;
