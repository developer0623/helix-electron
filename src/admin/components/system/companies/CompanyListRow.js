import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const CompanyListRow = ({company, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(company, e);
  }
  return (
    <tr>
      <td><Link to={'/admin/system/companies/' + company._id}>{company.name}</Link></td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

CompanyListRow.propTypes = {
  company: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default CompanyListRow;
