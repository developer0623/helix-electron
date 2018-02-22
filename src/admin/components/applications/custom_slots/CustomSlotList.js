import React, {PropTypes} from 'react';
import CustomSlotListRow from './CustomSlotListRow';
import CustomSlotsEmptyState from './CustomSlotsEmptyState';
import ReactPaginate from 'react-paginate';

import _ from 'lodash';

const CustomSlotList = ({applicationId, custom_slots, onDeleteButtonClick, numberOfPages, handlePageClick}) => {
  if (custom_slots.length == 0) {
    return (
      <CustomSlotsEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
        <tr>
          <th className="header">Name</th>
          <th className="header">Synonyms</th>
          <th className="header">Slot Value</th>
          <th className="header">Slot Type</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {custom_slots.map(custom_slot =>
          <CustomSlotListRow
            key={custom_slot._id}
            applicationId={applicationId}
            custom_slot={custom_slot}
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

CustomSlotList.propTypes = {
  applicationId: PropTypes.string.isRequired,
  custom_slots: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  numberOfPages: React.PropTypes.number.isRequired,
  handlePageClick: React.PropTypes.func.isRequired
};

export default CustomSlotList;
