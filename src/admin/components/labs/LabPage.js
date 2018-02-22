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
import * as labActions from '../../actions/companies/labActions';
import * as authActions from '../../actions/authActions';

import toastr from 'toastr';
import _ from 'lodash';

class LabPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onAddButtonClick = this.addButtonClick.bind(this);
    this.onDeleteButtonClick = this.deleteButtonClick.bind(this);
    this.onSelectClick = this.onSelectClick.bind(this);
  }
  addButtonClick() {
     this.props.history.push(`/admin/labs/new`);
  }
  onSelectClick(event, lab) {
    event.preventDefault();

    this.props.authActions.changeSelectedLab(lab)
    .then(() =>{
       this.props.history.push(`/admin/labs/settings`);
    })
    .catch((err) => {
      toastr.error(err);
    });
  }
  deleteButtonClick(event, lab) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.actions.deleteLab(this.props.company._id, lab)
    .then(() => {
      toastr.success(`Lab ${lab.lab_name} deleted.`);

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
          dashboardTitle="Labs"
        />
        <RepositoryListGrid
          repositories={this.props.repositories}
          onAddButtonClicked={this.onAddButtonClick}
          onDeleteButtonClick={this.onDeleteButtonClick}
          onSelectClick={this.onSelectClick}
          AddGridItemTemplate={AddGridItemTemplate}
          ListGridItemTemplate={ListGridItemTemplate}
        />
      </div>
    );
  }
}

LabPage.propTypes = {
  company: PropTypes.array.isRequired,
  repositories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  authActions: PropTypes.object.isRequired,
  repositoryType: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    repositories: state.auth.labs,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(labActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LabPage);
