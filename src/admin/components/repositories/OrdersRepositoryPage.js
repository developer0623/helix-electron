import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../common/DashboardHeader';
import RepositoryList from '../common/repositories/RepositoryList';
import RepositoryListGrid from '../common/repositories/RepositoryListGrid';
import ListItemTemplate from './ListTemplates/ListItemTemplate';
import ListGridItemTemplate from './GridTemplates/OrdersGridItemTemplate';
import EmptyState from './EmptyState/OrdersRepositoryEmptyState';
import LoadingSpinner from '../common/LoadingSpinner';
import './OrdersRepositoryPage.css';

import * as authActions from '../../actions/authActions';
import * as repositoryActions from '../../actions/labs/repositoryActions';

import _ from 'lodash';
import toastr from 'toastr';

class RepositoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.onSelectClick = this.onSelectClick.bind(this);
    this.showArchived = this.showArchived.bind(this);
    this.state = {
      showArchived: false
    };
  }


  onSelectClick(event, repository) {
    event.preventDefault();

    this.props.authActions.changeSelectedRepository(repository)
    .then(() =>{
      const url = `/admin/repositories/entities`;

       this.props.history.push(url);
    })
    .catch((err) => {
      toastr.error(err);
    });
  }
  onDeleteButtonClick(event, repository) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({saving: true});
    this.props.repositoryActions.deleteRepository(this.props.lab._id, repository)
    .then(() => {
      toastr.success(`Repository ${repository.name} deleted.`);

      this.setState({saving: false});
    })
    .catch((err) => {
      toastr.error(err);

      this.setState({saving: false});
    });
  }

  showArchived () {
    this.setState({
      showArchived: true
    });
  }


  render() {
    const activeRepoArray = this.props.repositories.filter((i) => i.isArchived === this.state.showArchived);

    if(activeRepoArray.length == 1 && !this.state.showArchived) {
      this.props.history.push(`/admin/ordering/${activeRepoArray[0]._id}/entities`);
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <DashboardHeader
            dashboardTitle={this.props.dashboardTitle}
          />
        <button className="view-archive">
            <div className="view-archive__link-to" onClick={this.showArchived}>
              <i className="icons icon-plus add-item" style={{ marginRight: '10px' }}/>
              View Archived Requests
            </div>

          </button>
        </div>

        {this.props.repositories.length == 0 || activeRepoArray.length == 0?
          <EmptyState
            emptyStateText="We haven't collected any order information, yet!"
            emptyStateSecondaryText="You can ask your virtual assistant to re-order items in your inventory.  We'll store the re-order information here."
          /> :
          <RepositoryListGrid
            repositories={activeRepoArray}
            repositoryType={this.props.repositoryType}
            onDeleteButtonClick={this.onDeleteButtonClick}
            onSelectClick={this.onSelectClick}
            ListGridItemTemplate={ListGridItemTemplate}
            loading={this.props.loading}
          />
        }
      </div>
    );
  }
}

RepositoryPage.propTypes = {
  dashboardTitle: PropTypes.string.isRequired,
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  repositories: PropTypes.array.isRequired,
  repositoryType: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
  repositoryActions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  const repositoryType = _.find(state.repositoryTypes, { type_name: "Orders" }) || {};
  const repositories = state.auth.companyOrders;
  const dashboardTitle = "Order Requests";

  return {
    company: state.auth.company,
    lab: state.auth.lab,
    repositories: repositories,
    repositoryType: repositoryType,
    dashboardTitle: dashboardTitle,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    repositoryActions: bindActionCreators(repositoryActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryPage);
