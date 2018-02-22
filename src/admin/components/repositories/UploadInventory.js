import React, {PropTypes}  from 'react';

const UploadInventory = ({inventoryFileName, onInventoryFileChange, onUploadInventoryClick}) => {
  return (
    <div>
      <form onSubmit={onUploadInventoryClick}>
        <input type="file" onChange={onInventoryFileChange}/>
        <button type="submit" onClick={onUploadInventoryClick}>Upload CSV</button>
      </form>
    </div>
  );
};

UploadInventory.propTypes = {
  inventoryFileName: PropTypes.string.isRequired,
  onInventoryFileChange: PropTypes.func.isRequred,
  onUploadInventoryClick: PropTypes.func.isRequired
};

export default UploadInventory;
