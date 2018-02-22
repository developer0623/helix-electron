import React, {PropTypes} from 'react';

const EmptyState = ({emptyStateText, emptyStateSecondaryText}) => {
  return (
    <div className="empty-state">
      <h5>{emptyStateText}</h5>
      <h6>{emptyStateSecondaryText}</h6>
    </div>
  );
};

EmptyState.propTypes = {
  emptyStateText: PropTypes.string.isRequired,
  emptyStateSecondaryText: PropTypes.string.isRequired
};

export default EmptyState;
