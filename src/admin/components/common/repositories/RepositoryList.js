import React, {PropTypes} from 'react';
import RepositoryListRow from './RepositoryListRow';
import LoadingDots from '../LoadingDots';
import EmptyState from '../EmptyState';

const RepositoryList = ({repositories, ListItemTemplate, emptyStateCopy, onAddButtonClicked, onDeleteButtonClick, numberOfPages, handlePageClick, loading}) => {
  if (repositories.length == 0) {
    return (
      <EmptyState
        emptyStateText={emptyStateCopy.primaryText}
        emptyStateButtonText={emptyStateCopy.addButtonText}
        emptyStateSecondaryText={emptyStateCopy.secondaryText}
        onEmptyStateButtonClick={onAddButtonClicked}
      />
    );
  }
  return (
    <div>
      {loading && <LoadingDots interval={100} dots={20} />}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
          <tr>
            <th className="header">Name</th>
            <th className="header"></th>
          </tr>
          </thead>
          <tbody>
          {repositories.map(repository =>
            <ListItemTemplate
              key={repository._id}
              repository={repository}
              onDeleteButtonClick={onDeleteButtonClick}
            />
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

RepositoryList.propTypes = {
  repositories: PropTypes.array.isRequired,
  emptyStateCopy: PropTypes.object.isRequired,
  onAddButtonClicked: PropTypes.func.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  itemUrlPrefix: PropTypes.string.isRequired,
  itemUrlSuffix: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  ListItemTemplate: PropTypes.object.isRequired
};

export default RepositoryList;
