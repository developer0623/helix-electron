import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

const EntityListHeaderTemplate = () => {
  return (
    <tr>
      <th className="header">Title</th>
      <th className="header">Sub-Title</th>
      <th className="header">URL</th>
      <th className="header">Date Added</th>
    </tr>
  );
};

EntityListHeaderTemplate.propTypes = {};

export default EntityListHeaderTemplate;
