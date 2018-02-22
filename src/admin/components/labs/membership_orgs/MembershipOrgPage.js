import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../../common/DashboardHeader';
import * as inventoryActions from '../../../actions/labs/inventoryActions';
import Filters from '../Filters';
import toastr from 'toastr';
import EmptyState from '../../common/EmptyState';

class MembershipOrgPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.pageInventory = this.pageInventory.bind(this);
    this.deleteInventoryItem = this.deleteInventoryItem.bind(this);
    this.redirectToAddRepositoryPage = this.redirectToAddRepositoryPage.bind(this);
  }
  componentWillMount() {
    this.props.actions.loadInventory();
  }
  deleteInventoryItem(inventoryItem, event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteInventory(inventoryItem)
      .then(() => toastr.success('Inventory Item Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  pageInventory(data) {
    let selected = data.selected + 1;

    this.props.actions.loadInventory(selected);
  }
  redirectToAddRepositoryPage() {
     this.props.history.push(`/admin/organizations/${this.props.company._id}/labs/${this.props.lab._id}/inventories/new`);
  }
  render() {
    return (
      <div>
        <Filters
          organizationId={this.props.company._id}
          lab={this.props.lab}
        />
        <DashboardHeader
          dashboardTitle="Membership Organizations"
        />
        <EmptyState
          emptyStateText="Add your labs inventory by setting up one or more inventories for your virtual assistant."
          emptyStateButtonText="Add an Affliation"
          emptyStateSecondaryText="You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items"
          onEmptyStateButtonClick={this.redirectToAddRepositoryPage}
        />
      </div>
    );
  }
}

MembershipOrgPage.propTypes = {
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    lab: state.auth.lab,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MembershipOrgPage);
