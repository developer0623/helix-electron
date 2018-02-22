import React, {PropTypes} from 'react';
import ReactPaginate from 'react-paginate';
import LoadingDots from '../../common/LoadingDots';

const EntityList = ({EmptyState, HeaderTemplate, ListItemTemplate, repository, entities, emptyStateProps, onDeleteButtonClick, numberOfPages, handlePageClick, loading}) => {
  if (entities.length == 0) {
    return (
      <EmptyState
        props={emptyStateProps}
      />
    );
  }
  return (
    <div>
      {/* loading && <LoadingDots interval={100} dots={20} /> */}
      <div className="table-responsive">
        <table className="table table-striped table-hover" style={{'height': 'calc(100vh - 120px)'}}>
          <thead>
          <HeaderTemplate />
          </thead>
          {entities.length &&
            <tbody>
            {entities.map(entity =>
              <ListItemTemplate
                key={entity._id}
                repository={repository}
                entity={entity}
                onDeleteButtonClick={onDeleteButtonClick}
              />
            )}
            </tbody>
          }
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
  repository: PropTypes.object.isRequired,
  entities: PropTypes.array.isRequired,
  emptyStateProps: PropTypes.object.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  EmptyState: PropTypes.func.isRequired,
  HeaderTemplate: PropTypes.func.isRequired,
  ListItemTemplate: PropTypes.func.isRequired
};

export default EntityList;
