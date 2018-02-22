import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../common/DashboardHeader';
import SearchRepository from '../common/SearchRepository';
import Filters from '../common/repositories/Filters';
import RepositoryList from '../common/repositories/RepositoryList';
import RepositoryListGrid from '../common/repositories/RepositoryListGrid';
import ListItemTemplate from './ListItemTemplate';
import AddGridItemTemplate from './AddGridItemTemplate';
import ListGridItemTemplate from './ListGridItemTemplate';
import * as applicationActions from '../../actions/companies/applicationActions';
import * as authActions from '../../actions/authActions';
import _ from 'lodash';
import toastr from 'toastr';

class LabPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onAddButtonClick = this.addButtonClick.bind(this);
    this.onSelectClicked = this.onSelectClick.bind(this);
  }
  addButtonClick() {
     this.props.history.push(`/admin/applications/new`);
  }
  onSelectClick(event, application) {
    event.preventDefault();

    this.props.actions.changeSelectedApplication(application)
    .then(() =>{
       this.props.history.push(`/admin/applications/settings`);
    })
    .catch((err) => {
      toastr.error(err);
    });
  }
  render() {
    const emptyStateCopy = {
      primaryText: 'Create virtual assistant for lab spaces in your organization.',
      secondaryText: 'You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items',
      addButtonText: 'Setup a Lab Space'
    };

    return (
      <div>
        <DashboardHeader
          dashboardTitle="Applications"
        />
        <RepositoryListGrid
          repositories={this.props.repositories}
          emptyStateCopy={emptyStateCopy}
          onSelectClick={this.onSelectClicked}
          onAddButtonClicked={this.onAddButtonClick}
          AddGridItemTemplate={AddGridItemTemplate}
          ListGridItemTemplate={ListGridItemTemplate}
        />
      </div>
    );
  }
}

LabPage.propTypes = {
  repositories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    repositories: state.auth.applications,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LabPage);
