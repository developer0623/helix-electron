import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const IntentLogSlotItem = ({slot}) => {
  return (
    <span>
      {slot.key} = {slot.value}
      <br />
    </span>
  );
};

IntentLogSlotItem.propTypes = {
  slot: PropTypes.object.isRequired
};

export default IntentLogSlotItem;
