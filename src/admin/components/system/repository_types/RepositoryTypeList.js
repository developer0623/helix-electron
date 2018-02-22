import React, {PropTypes} from 'react';
import RepositoryTypeListRow from './RepositoryTypeListRow';
import RepositoryTypeEmptyState from './RepositoryTypeEmptyState';
import ReactPaginate from 'react-paginate';

const RepositoryList = ({repositoryTypes, onDeleteButtonClick, numberOfPages, handlePageClick}) => {
  if (repositoryTypes.length == 0) {
    return (
      <RepositoryTypeEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
        <tr>
          <th className="header">Id</th>
          <th className="header">Type Name</th>
          <th className="header">Slot Type</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {repositoryTypes.map(repositoryType =>
          <RepositoryTypeListRow key={repositoryType._id}
            repositoryType={repositoryType}
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
  );
};

RepositoryList.propTypes = {
  repositoryTypes: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  numberOfPages: React.PropTypes.number.isRequired,
  handlePageClick: React.PropTypes.func.isRequired
};

export default RepositoryList;
