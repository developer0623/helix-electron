import React, {PropTypes} from 'react';

const EmptyState = ({emptyStateText, emptyStateButtonText, emptyStateSecondaryText, onEmptyStateButtonClick}) => {
  return (
    <div className="empty-state">
      <h5>{emptyStateText}</h5>
      <button
        type="button"
        className="btn btn-pill btn-primary"
        onClick={onEmptyStateButtonClick}>
          {emptyStateButtonText}
      </button>
      <h6>{emptyStateSecondaryText}</h6>
    </div>
  );
};

EmptyState.propTypes = {
  emptyStateText: PropTypes.string.isRequired,
  emptyStateButtonText: PropTypes.string.isRequired,
  emptyStateSecondaryText: PropTypes.string.isRequired,
  onEmptyStateButtonClick: PropTypes.func.isRequired
};

export default EmptyState;
