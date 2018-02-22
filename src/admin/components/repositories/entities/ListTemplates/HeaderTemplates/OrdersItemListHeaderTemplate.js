import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

const ListHeaderTemplate = () => {
  return (
    <tr>
      <th className="header">Item Name</th>
      <th className="header">Vendor</th>
      <th className="header">Catalog Number</th>
      <th className="header">Location</th>
      <th className="header">Order Date</th>
      <th className="header"></th>
    </tr>
  );
};

ListHeaderTemplate.propTypes = {};

export default ListHeaderTemplate;
