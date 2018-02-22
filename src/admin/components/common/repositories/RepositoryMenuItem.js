import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router-dom';

const RepositoryMenuItem = ({repository}) => {
  return (
    <li className="nav-item">
      <Link to={`/admin/repositories/${repository._id}/entities`} className="btn btn-pill btn-primary mr-1" activeClassName="active">{repository.name}</Link>
    </li>
  );
};

RepositoryMenuItem.propTypes = {
  repository: PropTypes.object.isRequired
};

export default RepositoryMenuItem;
