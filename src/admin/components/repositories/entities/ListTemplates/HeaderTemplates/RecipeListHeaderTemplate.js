import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

const EntityListHeaderTemplate = () => {
  return (
    <tr>
      <th className="header">Recipe Name</th>
      <th className="header"># of Ingredients</th>
      <th className="header">Date Added</th>
      <th className="header">Last Updated</th>
    </tr>
  );
};

EntityListHeaderTemplate.propTypes = {};

export default EntityListHeaderTemplate;
