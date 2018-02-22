import React, {PropTypes} from 'react';
import UserListRow from './UserListRow';
import UsersEmptyState from './UsersEmptyState';
import ReactPaginate from 'react-paginate';

const UserList = ({users, onDeleteButtonClick, numberOfPages, handlePageClick}) => {
  if (users.length == 0) {
    return (
      <UsersEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
        <tr>
          <th className="header">&nbsp;</th>
          <th className="header">First Name</th>
          <th className="header">Last Name</th>
          <th className="header">User Type</th>
          <th className="header">Company Name</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {users.map(user =>
          <UserListRow key={user._id} user={user} onDeleteButtonClick={onDeleteButtonClick} />
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

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default UserList;
