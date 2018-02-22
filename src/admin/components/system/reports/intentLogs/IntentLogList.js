import React, {PropTypes} from 'react';
import IntentLogListRow from './IntentLogListRow';
import IntentLogsEmptyState from './IntentLogsEmptyState';
import ReactPaginate from 'react-paginate';

const IntentLogList = ({intentLogs, numberOfPages, handlePageClick}) => {
  if (intentLogs.length == 0) {
    return (
      <IntentLogsEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
        <tr>
          <th className="header">Request Id</th>
          <th className="header">Type</th>
          <th className="header">Intent</th>
          <th className="header">Slots</th>
          <th className="header">User</th>
          <th className="header">Success?</th>
          <th className="header">Timestamp</th>
        </tr>
        </thead>
        <tbody>
        {intentLogs.map(intentLog =>
          <IntentLogListRow key={intentLog._id} intentLog={intentLog} />
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

IntentLogList.propTypes = {
  intentLogs: PropTypes.array.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired
};

export default IntentLogList;
