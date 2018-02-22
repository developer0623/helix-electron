import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../common/DashboardHeader';
import ListGrid from './RepositoryGroupListGrid';
import LoadingSpinner from '../common/LoadingSpinner';

import _ from 'lodash';
import toastr from 'toastr';

class RepositoryGroupsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log("repositoryGroups", this.props.repositoryGroups);
    this.onSelectClick = this.onSelectClick.bind(this);
  }
  onSelectClick(event, repository) {
    event.preventDefault();
    const url = `/admin/repositories/${repository._id}`;
    this.props.history.push(url);

    // this.props.authActions.changeSelectedRepository(repository)
    // .then(() =>{
    //   const url = `/admin/repositories/entities`;

    //   this.props.history.push(url);
    // })
    // .catch((err) => {
    //   toastr.error(err);
    // });
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Repositories"
        />
      {this.props.repositoryGroups.length !== 0 ?
        <ListGrid
          repositoryGroups={this.props.repositoryGroups}
          onSelectClick={this.onSelectClick}
        /> : <LoadingSpinner />
      }
      </div>
    );
  }
}

RepositoryGroupsPage.propTypes = {
  company: PropTypes.object.isRequired,
  repositoryGroups: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    repositoryGroups: state.repositoryGroups,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryGroupsPage);
