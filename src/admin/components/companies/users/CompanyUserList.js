// import React, { PropTypes }  from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Link } from 'react-router-dom';
// import './CompanyUserList.css';
//
// class CompanyUserList extends React.Component {
//   constructor(props, context) {
//     super(props, context);
//
//     this.state = {
//       userOffsetForPagination: 0,
//     };
//
//     this.deleteUser = this.deleteUser.bind(this);
//     this.renderUserRow = this.renderUserRow.bind(this);
//     this.renderPaginateNumbers = this.renderPaginateNumbers.bind(this);
//     this.setPaginateStartNumber = this.setPaginateStartNumber.bind(this);
//   }
//
//
//   deleteUser(e) {
//     console.log(e.currentTarget.dataset.userid);
//   }
//
//
//   renderUserRow(user) {
//     return (
//       <tr key={user._id} className="user-table-row">
//         <td className="user-table-row--blue">
//           <a href={`mailto:${user.email_address}`} style={{ color: '#4c8fdd' }}>{user.email_address}</a>
//         </td>
//         <td>{user.first_name}</td>
//         <td>{user.last_name}</td>
//         <td>{user.enrolled_user || 'default value'}</td>
//         <td>{user.last_login || 'default value'}</td>
//         <td className="user-table-row--blue">
//           <a role="button" data-userId={user._id} onClick={this.deleteUser}>Delete</a>
//         </td>
//       </tr>
//     );
//   }
//
//   setPaginateStartNumber(e){
//     const currentOffset = e.currentTarget.dataset.currentoffset;
//     this.setState({ userOffsetForPagination: Number(currentOffset) });
//   }
//
//   renderPaginateNumbers(users) {
//     const numberOfSquares = this.howManyPaginateSquaresNeeded(users.length);
//     const dummyArray = [...Array(numberOfSquares).keys()];
//     return (
//       <div className="user-list-pagination">
//         {dummyArray.map((elem, index) =>
//           <div
//             key={index}
//             className="user-list-pagination__item"
//             role="button"
//             data-currentOffset={index}
//             onClick={this.setPaginateStartNumber}
//           >
//             {index + 1}
//           </div>
//         )}
//       </div>
//     );
//   }
//
//   howManyPaginateSquaresNeeded(userLength) {
//     let res = Math.floor(userLength / 10);
//
//     if(userLength % 10 !== 0) {
//       res = res + 1;
//     }
//
//     return res;
//   }
//
//   render() {
//     const { users } = this.props;
//     const currentOffset = this.state.userOffsetForPagination;
//     const paginatedUsers = users.length ? users.slice(currentOffset * 10, (currentOffset + 1) * 10): [];
//     console.log(paginatedUsers);
//     console.log(currentOffset);
//
//     return (
//       <div className="company-user-list">
//
//         <div className="top-header">
//           <div>
//             <div className="top-header__settings">settings</div>
//             <div className="top-header__users">Users</div>
//           </div>
//           <Link to="/admin/organization/users/new" className="top-header__add-user-button">Add User</Link>
//         </div>
//
//         <table className="user-list-table">
//           <tbody>
//             <tr className="user-table-header-row">
//               <th className="user-table-header-row__item">Email Address</th>
//               <th className="user-table-header-row__item">First Name</th>
//               <th className="user-table-header-row__item">Last Name</th>
//               <th className="user-table-header-row__item">Enrolled User</th>
//               <th className="user-table-header-row__item">Last Logged In</th>
//               <th className="user-table-header-row__item" />
//             </tr>
//
//             { users.length ? paginatedUsers.map(this.renderUserRow): null }
//
//           </tbody>
//         </table>
//
//         { users.length ? this.renderPaginateNumbers(users): null }
//
//
//       </div>
//     );
//   }
// }
//
// CompanyUserList.propTypes = {
//   users: PropTypes.array,
// };
//
// CompanyUserList.contextTypes = {
//   router: PropTypes.object
// };
//
// function mapStateToProps(state, ownProps) {
//   const users = state.auth.company.organization_users;
//   return {
//     users,
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     boundedCompanyUsersActions: bindActionCreators(() => {}, dispatch),
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(CompanyUserList);
