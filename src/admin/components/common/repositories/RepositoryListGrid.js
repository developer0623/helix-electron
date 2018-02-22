import React, {PropTypes} from 'react';
import RepositoryListGridItem from './RepositoryListGridItem';
import LoadingDots from '../LoadingDots';
import EmptyState from '../EmptyState';

const RepositoryListGrid= ({AddGridItemTemplate, ListGridItemTemplate, repositories, repositoryType, onSelectClick, onDeleteButtonClick, loading}) => {
  return (
    <div className="container">
      <div className="row">
        {loading && <LoadingDots interval={100} dots={20} />}
        {AddGridItemTemplate && repositoryType && <AddGridItemTemplate
          repositoryType={repositoryType}
        />}
        {repositories.map(repository =>
          <ListGridItemTemplate
            key={repository._id}
            repository={repository}
            onSelectClick={onSelectClick}
            onDeleteButtonClick={onDeleteButtonClick} />
        )}
      </div>
    </div>
  );
};

RepositoryListGrid.propTypes = {
  repositories: PropTypes.array.isRequired,
  onSelectClick: React.PropTypes.func.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  repositoryType: PropTypes.object,
  AddGridItemTemplate: PropTypes.func,
  ListGridItemTemplate: PropTypes.func.isRequired
};

export default RepositoryListGrid;
