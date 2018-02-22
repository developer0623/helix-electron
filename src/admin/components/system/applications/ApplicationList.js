import React, {PropTypes} from 'react';
import ApplicationListRow from './ApplicationListRow';
import ApplicationEmptyState from './ApplicationEmptyState';
import ReactPaginate from 'react-paginate';

const  ApplicationList = ({applications, onDeleteButtonClick, numberOfPages, handlePageClick}) => {
  if (applications.length == 0) {
    return (
      <ApplicationEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
        <tr>
          <th className="header">Name</th>
          <th className="header">Invocation Phrase</th>
          <th className="header">Company</th>
          <th className="header">Created At</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {applications.map(application =>
          <ApplicationListRow
            key={application._id}
            application={application}
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

ApplicationList.propTypes = {
  applications: PropTypes.array.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default ApplicationList;
