import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../common/DashboardHeader';
import RepositoryList from '../common/repositories/RepositoryList';
import RepositoryListGrid from '../common/repositories/RepositoryListGrid';
import ListItemTemplate from './ListTemplates/ListItemTemplate';
import AddGridItemTemplate from './GridTemplates/AddInventoryGridItemTemplate';
import ListGridItemTemplate from './GridTemplates/InventoryGridItemTemplate';
import LoadingSpinner from '../common/LoadingSpinner';

import * as authActions from '../../actions/authActions';
import * as inventoryActions from '../../actions/labs/inventoryActions';

import _ from 'lodash';
import toastr from 'toastr';

class InventoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.redirectToAddInventoryPage = this.redirectToAddInventoryPage.bind(this);
    this.onSelectClick = this.onSelectClick.bind(this);
  }
  redirectToAddInventoryPage() {
    this.props.history.push(`/admin/inventories/new`);
  }
  onSelectClick(event, repository) {
    event.preventDefault();

    this.props.authActions.changeSelectedRepository(repository)
    .then(() =>{
       this.props.history.push(`/admin/inventories/entities`);
    })
    .catch((err) => {
      toastr.error(err);
    });
  }
  onDeleteButtonClick(event, inventory) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({saving: true});
    this.props.actions.deleteInventory(this.props.lab._id, inventory)
    .then(() => {
      toastr.success(`Inventory ${inventory.name} deleted.`);

      this.setState({saving: false});
    })
    .catch((err) => {
      toastr.error(err);

      this.setState({saving: false});
    });
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle={this.props.dashboardTitle}
          AddItemTemplate={AddGridItemTemplate}
          onButtonClick={this.redirectToAddInventoryPage}
          buttonText="Create An Inventory"
        />

        <RepositoryListGrid
          repositories={this.props.repositories}
          repositoryType={this.props.repositoryType}
          onDeleteButtonClick={this.onDeleteButtonClick}
          onSelectClick={this.onSelectClick}
          ListGridItemTemplate={ListGridItemTemplate}
          loading={this.props.loading}
        />
     

      </div>
    );
  }
}

InventoryPage.propTypes = {
  dashboardTitle: PropTypes.string.isRequired,
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  repositories: PropTypes.array.isRequired,
  repositoryType: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  const repositoryType = _.find(state.repositoryTypes, { type_name: "Inventory" }) || {};
  const repositories = state.auth.inventories;
  const dashboardTitle = "Inventories";

  return {
    user: state.auth.currentUser,
    company: state.auth.company,
    lab: state.auth.lab,
    repositories: _.sortBy(repositories, "name"),
    repositoryType: repositoryType,
    dashboardTitle: dashboardTitle,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inventoryActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPage);
