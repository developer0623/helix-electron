import React, {PropTypes} from 'react';
import CompanyListRow from './CompanyListRow';
import CompanyEmptyState from './CompanyEmptyState';
import ReactPaginate from 'react-paginate';

const CompanyList = ({companies, onDeleteButtonClick, numberOfPages, handlePageClick}) => {
  if (companies.length == 0) {
    return (
      <CompanyEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
        <tr>
          <th className="header">Name</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {companies.map(company =>
          <CompanyListRow key={company._id}
            company={company}
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

CompanyList.propTypes = {
  companies: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  numberOfPages: React.PropTypes.number.isRequired,
  handlePageClick: React.PropTypes.func.isRequired
};

export default CompanyList;
