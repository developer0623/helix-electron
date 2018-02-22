import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

const EntityListHeaderTemplate = () => {
  return (
    <tr>
      <th className="header">Name</th>
      <th className="header">Say As</th>
      <th className="header">Synonyms</th>
      <th className="header">Company</th>
      <th className="header"></th>
    </tr>
  );
};

EntityListHeaderTemplate.propTypes = {};

export default EntityListHeaderTemplate;
