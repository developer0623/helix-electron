import React, {PropTypes}  from 'react';
import Modal from 'boron/DropModal';
import UploadInventory from './UploadInventory';

const UploadInventoryModal = ({inventoryFileName, onInventoryFileChange, onUploadInventoryClick}) => {
  return (
    <div>
      <Modal ref="modal">
        <h2>Upload Inventory</h2>
        <UploadInventory
          onInventoryFileChange={onInventoryFileChange}
          onUploadInventoryClick={onUploadInventoryClick}
          inventoryFileName={inventoryFileName}
        />
      </Modal>
    </div>
  );
};

UploadInventoryModal.propTypes = {
  inventoryFileName: PropTypes.string.isRequired,
  onInventoryFileChange: PropTypes.func.isRequred,
  onUploadInventoryClick: PropTypes.func.isRequired
};

export default UploadInventoryModal;
