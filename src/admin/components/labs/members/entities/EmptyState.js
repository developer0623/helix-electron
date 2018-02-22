import React, {PropTypes} from 'react';

const EmptyState = ({emptyStateText, emptyStateButtonText, emptyStateSecondaryText, inventoryFileName, onInventoryFileChange, onUploadInventoryClick, onEmptyStateButtonClick}) => {
  return (
    <div className="empty-state">
      <h5>{emptyStateText}</h5>

      <h6>{emptyStateSecondaryText}</h6>
    </div>
  );
};

EmptyState.propTypes = {
  emptyStateText: PropTypes.string.isRequired,
  emptyStateButtonText: PropTypes.string.isRequired,
  emptyStateSecondaryText: PropTypes.string.isRequired,
  onEmptyStateButtonClick: PropTypes.func.isRequired,
  inventoryFileName: PropTypes.string.isRequired,
  onInventoryFileChange: PropTypes.func.isRequired,
  onUploadInventoryClick: PropTypes.func.isRequired
};

export default EmptyState;
