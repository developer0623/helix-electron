import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const AssociatedTypeItem = ({associatedType}) => {
  return (
    <span>
      {associatedType.type_name}
      <br />
    </span>
  );
};

AssociatedTypeItem.propTypes = {
  associatedType: PropTypes.object.isRequired
};

export default AssociatedTypeItem;
