import React, {PropTypes} from 'react';
import EntityListRow from './EntityListRow';
import ReactPaginate from 'react-paginate';
import LoadingDots from '../../../common/LoadingDots';
import EmptyState from '../../../common/EmptyState';

const EntityList = ({companyId, labId, type, dataSet, emptyStateCopy, repositoryId, entities, onDeleteButtonClick, numberOfPages, handlePageClick, onAddButtonClick, loading}) => {
  if (entities.length == 0) {
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
            <th className="header">Say As</th>
            <th className="header">Synonyms</th>
            <th className="header">Company</th>
            <th className="header"></th>
          </tr>
          </thead>
          <tbody>
          {entities.map(entity =>
            <EntityListRow key={entity._id}
              companyId={companyId}
              labId={labId}
              type={type}
              dataSetId={dataSet._id}
              repositoryId={repositoryId}
              entity={entity}
              onDeleteButtonClick={onDeleteButtonClick} />
          )}
          </tbody>
        </table>
        <ReactPaginate previousLabel={"previous"}
           nextLabel={"next"}
           breakLabel={<a href="">...</a>}
           breakClassName={"break-me"}
           pageCount={numberOfPages}
           marginPagesDisplayed={2}
           pageRangeDisplayed={5}
           onPageChange={handlePageClick}
           containerClassName={"pagination"}
           pageClassName={"page-item"}
           pageLinkClassName={"page-link"}
           activeClassName={"active"}
           previousClassName={"page-item"}
           previousLinkClassName={"page-link"}
           nextClassName={"page-item"}
           nextLinkClassName={"page-link"}
           disabledClassName={"disabed"}
           subContainerClassName={"pages pagination"}
         />
      </div>
    </div>
  );
};

EntityList.propTypes = {
  companyId: PropTypes.string.isRequired,
  labId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataSet: PropTypes.object.isRequired,
  emptyStateCopy: PropTypes.object.isRequired,
  repositoryId: PropTypes.string.isRequired,
  entities: PropTypes.array.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  onAddButtonClick: React.PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default EntityList;
