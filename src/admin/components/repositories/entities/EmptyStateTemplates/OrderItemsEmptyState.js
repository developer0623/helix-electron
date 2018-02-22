import React, {PropTypes} from 'react';

const EmptyState = ({props}) => {
  return (
    <div className="empty-state">
      <h5>{"No orders have been created."}</h5>
      <h6>{"Once your add items, your lab will be able to ask for the location of inventory items, check items out of inventory, or make a note to re-order an item."}</h6>
    </div>
  );
};

EmptyState.propTypes = {
  props: PropTypes.object.isRequired
};

export default EmptyState;
