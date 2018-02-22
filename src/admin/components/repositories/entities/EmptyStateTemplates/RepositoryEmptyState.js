import React, {PropTypes} from 'react';

const EmptyState = ({props}) => {
  return (
    <div className="empty-state">
      <h5>{"You haven't added any items.  To add inventory use our Excel template below and upload your inventory.  Or you can manually add inventory items."}</h5>
      {props.onEmptyStateButtonClick && <button
        type="button"
        className="btn btn-pill btn-primary"
        onClick={props.onEmptyStateButtonClick}>
        Add Item
      </button>}
      <h6>{"Once your add items, your lab will be able to ask for the location of inventory items, check items out of inventory, or make a note to re-order an item."}</h6>
    </div>
  );
};

EmptyState.propTypes = {
  props: PropTypes.object.isRequired,
  onEmptyStateButtonClick: PropTypes.func.isRequired
};

export default EmptyState;
