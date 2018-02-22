import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

const InventoryItemListHeaderTemplate = () => {
  return (
    <tr>
      <th className="header">Name</th>
      <th className="header">Vendor</th>
      <th className="header">Serial Number</th>
      <th className="header">Location</th>
      <th className="header">Sub-Location</th>
      <th className="header"></th>
    </tr>
  );
};

InventoryItemListHeaderTemplate.propTypes = {};

export default InventoryItemListHeaderTemplate;
