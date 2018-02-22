import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router-dom';
import RepositoryMenuItem from './RepositoryMenuItem';

const Filters = ({repositories, onAddRepositoryClicked}) => {
  return (
    <div>
      <div className="filter-nav mt-4 mb-4">
        <div className="flextable">
          <div className="flextable-item">
            <ul className="nav nav-pills">
              {repositories.map(repository =>
                <RepositoryMenuItem key={repository._id}
                  repository={repository}  />
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  repositories: PropTypes.array.isRequired,
  onAddRepositoryClicked: PropTypes.func.isRequired
};

export default Filters;
