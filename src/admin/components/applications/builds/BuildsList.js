import React, {PropTypes} from 'react';
import LogsListRow from './BuildsListRow';
import LogsEmptyState from './BuildsEmptyState';
import ReactPaginate from 'react-paginate';

const LogsList = ({builds, numberOfPages, handlePageClick}) => {
  if (builds.length == 0) {
    return (
      <LogsEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
        <tr>
          <th className="header">Build #</th>
          <th className="header">Author</th>
          <th className="header">Start Time</th>
          <th className="header">End Time</th>
          <th className="header">Status</th>
          <th className="header">Message</th>
        </tr>
        </thead>
        <tbody>
        {builds.map(build =>
          <LogsListRow key={build._id} build={build} />
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

LogsList.propTypes = {
  builds: PropTypes.array.isRequired,
  numberOfPages: React.PropTypes.number.isRequired,
  handlePageClick: React.PropTypes.func.isRequired
};

export default LogsList;
