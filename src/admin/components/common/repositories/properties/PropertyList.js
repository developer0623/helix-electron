import React, {PropTypes} from 'react';
import PropertyListRow from './PropertyListRow';
import LoadingDots from '../../../common/LoadingDots';
import EmptyState from '../../../common/EmptyState';

const PropertyList = ({repository, emptyStateCopy, properties, onDeleteButtonClick, onAddButtonClick, loading}) => {
  if (properties.length == 0) {
    return (
      <EmptyState
        emptyStateText="Data Sets allow you to organization your companies information into groups that are easily searchable by researchers."
        emptyStateButtonText={emptyStateCopy.addButtonText}
        emptyStateSecondaryText="You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items"
        onEmptyStateButtonClick={onAddButtonClick}
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
            <th className="header">Slot Type</th>
            <th className="header">Synonyms</th>
            <th className="header"></th>
          </tr>
          </thead>
          <tbody>
          {properties.map(property =>
            <PropertyListRow key={property._id}
              repository={repository}
              property={property}
              onDeleteButtonClick={onDeleteButtonClick} />
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

PropertyList.propTypes = {
  repository: PropTypes.object.isRequired,
  emptyStateCopy: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  onAddButtonClick: React.PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default PropertyList;
