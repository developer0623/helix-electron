import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const ApplicationListRow = ({application, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(application, e);
  }
  let companyName;
  if(application.owner) {
    companyName = application.owner.name;
  }
  return (
    <tr>
      <td><Link to={'/admin/system/applications/' + application._id}>{application.name}</Link></td>
      <td>{application.invocation_name}</td>
      <td>{companyName}</td>
      <td>{application.createdAt}</td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

ApplicationListRow.propTypes = {
  application: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default ApplicationListRow;
