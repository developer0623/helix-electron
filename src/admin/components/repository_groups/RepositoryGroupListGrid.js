import React, {PropTypes} from 'react';
import ListGridItem from './RepositoryGroupListGridItem';

const RepositoryGroupListGrid= ({repositoryGroups, onSelectClick}) => {
  return (
    <div className="container">
      <div className="row">
        {repositoryGroups.map(repositoryGroup =>
          <ListGridItem
            key={repositoryGroup._id}
            repositoryGroup={repositoryGroup}
            onSelectClick={onSelectClick} />
        )}
      </div>
    </div>
  );
};

RepositoryGroupListGrid.propTypes = {
  repositoryGroups: PropTypes.array.isRequired,
  onSelectClick: React.PropTypes.func
};

export default RepositoryGroupListGrid;
