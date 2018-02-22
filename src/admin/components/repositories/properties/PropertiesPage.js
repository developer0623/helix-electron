import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as entityActions from '../../../actions/entityActions';
import * as repositoryActions from '../../../actions/companies/repositoryActions';
import DashboardHeader from '../../common/repositories/entities/DashboardHeader';
import SearchRepository from '../../common/SearchRepository';
import PropertyForm from './PropertyForm';
import toastr from 'toastr';
import _ from 'lodash';

import EntityPropertyFactory from '../entities/Factories/EntityPropertyFactory';

class PropertyPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      repository: _.cloneDeep(this.props.repository),
      errors: {}
    };
    this.redirectToAddPropertyItemPage = this.redirectToAddPropertyItemPage.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
    this.editProperty = this.editProperty.bind(this);
    this.updateRepositoryState = this.updateRepositoryState.bind(this);
    this.saveRepository = this.saveRepository.bind(this);
    this.onDashboardActionsButtonClick = this.dashboardActionsButtonClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.repository._id != nextProps.repository._id) {
      this.setState({repository: _.cloneDeep(nextProps.repository)});
    }
    if(this.props.repository.attributes.properties.length != nextProps.repository.attributes.properties.length) {
      this.setState({repository: _.cloneDeep(nextProps.repository)});
    }
  }

  addProperty(event, property) {
     this.props.history.push(`/admin/repositories/${this.props.repository._id}/properties/new`);
  }
  editProperty(event, property) {
     this.props.history.push(`/admin/repositories/${this.props.repository._id}/properties/${property._id}`);
  }
  deleteProperty(event, entityProperty) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteEntityProperty(this.props.company._id, this.state.repository, entityProperty)
      .then(() => toastr.success('Property Type Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  updateRepositoryState(event) {
    const field = event.target.name;
    let repository = this.state.repository;
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    repository[field] = value;

    return this.setState({repository: repository});
  }
  saveRepository(event) {
    event.preventDefault();
    this.setState({saving: true});

    this.props.repositoryActions.saveRepository(this.props.company._id, this.state.repository)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  dashboardActionsButtonClick(event) {
     this.props.history.push(`/admin/repositories/${this.state.repository._id}/entities`);
  }
  redirectToAddPropertyItemPage() {
     this.props.history.push(`/admin/repositories/${this.state.repository._id}/properties/new`);
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Repository Changes Saved');

    this.context.router.history.push(`/admin/repositories`);
  }
  render() {

    return (
      <div>
        <DashboardHeader
          dashboardTitle="Edit Repository"
          actionButtonText="Entities"
          onActionButtonClick={this.onDashboardActionsButtonClick}
        />
        <PropertyForm
          repository={this.props.repository}
          properties={this.props.properties}
          errors={this.state.errors}
          onAddButtonClick={this.addProperty}
          onDeleteButtonClick={this.deleteProperty}
          onEditButtonClick={this.editProperty}
          onUpdateRepository={this.updateRepositoryState}
          onSaveRepository={this.saveRepository}
          loading={this.props.loading}
        />
      </div>
    );
  }
}
PropertyPage.contextTypes = {
  router: PropTypes.object
};
PropertyPage.propTypes = {
  dashboardTitle: PropTypes.string.isRequired,
  company: PropTypes.object.isRequired,
  repository: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
  emptyStateCopy: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  repositoryActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let repositories = _.sortBy(state.auth.repositories, "name");
  let dashboardTitle = "";

  let repository = {
    attributes: {
      properties: []
    }
  };
  let properties = [];

  const foundRepository = _.find(repositories, { _id: ownProps.match.params.repository_id });
  if(foundRepository) {
    repository = foundRepository;
    dashboardTitle = repository.name;
    if(repository.attributes && repository.attributes.properties) {
      properties = _.sortBy(repository.attributes.properties, "name");
    }
  }
  let emptyStateCopy = EntityPropertyFactory.emptyStateCopy();

  return {
    dashboardTitle: dashboardTitle,
    company: state.auth.company,
    repository: repository,
    properties: properties,
    emptyStateCopy: emptyStateCopy,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(entityActions, dispatch),
    repositoryActions: bindActionCreators(repositoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPage);
