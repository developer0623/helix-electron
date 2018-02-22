import React, {PropTypes} from 'react';
import IntentListRow from './IntentListRow';
import IntentsEmptyState from './IntentsEmptyState';
import ReactPaginate from 'react-paginate';

const IntentList = ({intents, onDeleteButtonClick,  numberOfPages, handlePageClick}) => {
  if (intents.length == 0) {
    return (
      <IntentsEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
        <tr>
          <th className="header">Intent</th>
          <th className="header">Built-In</th>
          <th className="header">Utterances</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {intents.map(intent =>
          <IntentListRow key={intent._id} intent={intent} onDeleteButtonClick={onDeleteButtonClick} />
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

IntentList.propTypes = {
  intents: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  numberOfPages: React.PropTypes.number.isRequired,
  handlePageClick: React.PropTypes.func.isRequired
};

export default IntentList;
