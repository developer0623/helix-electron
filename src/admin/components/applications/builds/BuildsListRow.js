import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const LogsListRow = ({build, onDeleteButtonClick}) => {

  return (
    <tr>
      <td><Link to={'/admin/builds/logs/' + build._id}>{build._id}</Link></td>
      <td>{build.author.name}</td>
      <td>{build.start_time}</td>
      <td>{build.end_time}</td>
      <td>{build.status}</td>
      <td>{build.message}</td>
    </tr>
  );
};

LogsListRow.propTypes = {
  build: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default LogsListRow;
