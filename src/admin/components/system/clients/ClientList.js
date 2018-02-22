import React, {PropTypes} from 'react';
import ClientListRow from './ClientListRow';
import ClientsEmptyState from './ClientsEmptyState';
import ReactPaginate from 'react-paginate';

const ClientList = ({clients, loading, onDeleteButtonClick, numberOfPages, handlePageClick}) => {
  if (clients.length == 0) {
    return (
      <ClientsEmptyState />
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
        {clients.map(client =>
          <ClientListRow key={client._id}
            client={client}
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

ClientList.propTypes = {
  clients: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  numberOfPages: React.PropTypes.number.isRequired,
  handlePageClick: React.PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ClientList;
