import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const LabMemberRow = ({lab_member, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(lab_member, e);
  }
  return (
    <div className="labMember row">
      <span className="col-md-6">{lab_member.first_name} {lab_member.last_name}</span>
      <span className="col-md-3">{lab_member.email_address}</span>
      <span className="col-md-3">{lab_member.mobile_number}</span>
    </div>
  );
};

LabMemberRow.propTypes = {
  lab_member: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default LabMemberRow;
