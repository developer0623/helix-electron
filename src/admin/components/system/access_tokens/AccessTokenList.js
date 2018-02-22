import React, {PropTypes} from 'react';
import AccessTokenListRow from './AccessTokenListRow';
import AccessTokensEmptyState from './AccessTokenEmptyState';
import ReactPaginate from 'react-paginate';

const  AccessTokenList = ({accessTokens, onDeleteButtonClick, numberOfPages, handlePageClick}) => {
  if (accessTokens.length == 0) {
    return (
      <AccessTokensEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
        <tr>
          <th className="header">Name</th>
          <th className="header">Client Id</th>
          <th className="header">Secret</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {accessTokens.map(accessToken =>
          <AccessTokenListRow
            key={accessToken._id}
            accessToken={accessToken}
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

AccessTokenList.propTypes = {
  accessTokens: PropTypes.array.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default AccessTokenList;
