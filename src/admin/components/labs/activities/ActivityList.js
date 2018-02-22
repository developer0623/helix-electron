import React, {PropTypes} from 'react';
import ReactPaginate from 'react-paginate';
import LoadingDots from '../../common/LoadingDots';
import ActivityListRow from './ActivityListRow';

const ActivityList = ({activities, numberOfPages, handlePageClick, loading}) => {
  if (activities.length == 0) {
    return (
      <div className="emptyState">
        {"We haven't collected any activities yet."}
      </div>
    );
  }
  return (
    <div>
      {loading && <LoadingDots interval={100} dots={20} />}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
          <tr>
            <th className="header">Date/time</th>
            <th className="header">Request Type</th>
            <th className="header">Intent Name</th>
            <th className="header">Variables</th>
            <th className="header">User</th>
            <th className="header"></th>
          </tr>
          </thead>
          <tbody>
          {activities.map(activity =>
            <ActivityListRow
              key={activity._id}
              activity={activity} />
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

ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ActivityList;
