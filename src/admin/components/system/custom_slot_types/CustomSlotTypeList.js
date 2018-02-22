import React, {PropTypes} from 'react';
import CustomSlotTypeListRow from './CustomSlotTypeListRow';
import CustomSlotTypeEmptyState from './CustomSlotTypeEmptyState';
import ReactPaginate from 'react-paginate';

const CustomSlotTypeList = ({customSlotTypes, onDeleteButtonClick, numberOfPages, handlePageClick}) => {
  if (customSlotTypes.length == 0) {
    return (
      <CustomSlotTypeEmptyState />
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
        {customSlotTypes.map(customSlotType =>
          <CustomSlotTypeListRow key={customSlotType._id}
            customSlotType={customSlotType}
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

CustomSlotTypeList.propTypes = {
  customSlotTypes: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  numberOfPages: React.PropTypes.number.isRequired,
  handlePageClick: React.PropTypes.func.isRequired
};

export default CustomSlotTypeList;
