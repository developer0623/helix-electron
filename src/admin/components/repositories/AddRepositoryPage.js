import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DashboardHeader from '../common/DashboardHeader';
import repositoryApi from '../../../api/labs/repositoryApi';
import toastr from 'toastr';
import _ from 'lodash';

import * as repositoryActions from '../../actions/labs/repositoryActions';

import RepositoryFlow from './Flows/RepositoryFlow';

const totalNumberOfSteps = 4;

class AddRepositoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      repository: this.props.repository,
      currentStep: 1,
      errors: {},
      saving: false
    };
    this.updateRepositoryState = this.updateRepositoryState.bind(this);
    this.saveRepository = this.saveRepository.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.createEmptyRepository = this.createEmptyRepository.bind(this);
    this.importOrganizationRepository = this.importOrganizationRepository.bind(this);
    this.selectRepositoryType = this.selectRepositoryType.bind(this);
    this.onPreviousClick = this.previousClicked.bind(this);
    this.onNextClick = this.nextClicked.bind(this);
  }
  nextClicked(event) {
    event.preventDefault();

    if(this.state.currentStep > totalNumberOfSteps - 1)
      return;

    this.setState({
      currentStep: this.state.currentStep + 1
    });
  }
  previousClicked(event) {
    event.preventDefault();

    if(this.state.currentStep == 0)
      return;

    this.setState({
      currentStep: this.state.currentStep - 1
    });
  }
  updateRepositoryState(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    let repository = this.state.repository;
    repository[field] = value;
    return this.setState({repository: repository});
  }
  saveRepository(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.repositoryActions.saveRepository(this.props.lab._id, this.state.repository)
      .then((savedRepository) => {
        this.setState({
          repository: savedRepository,
          currentStep: this.state.currentStep + 1
        });
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  onComplete(event) {
    event.preventDefault();

    this.context.router.history.push(`/admin/labs/repositories`);
  }
  createEmptyRepository(event) {
    event.preventDefault();

    this.setState({currentStep: 2});
  }
  importOrganizationRepository(event) {
    event.preventDefault();

    this.setState({currentStep: 3});
  }
  selectRepositoryType(event, repositoryType) {
    event.preventDefault();

    let repository = this.state.repository;
    repository.repository_type = repositoryType;

    this.setState({
      repository: repository,
      currentStep: 4
    });
  }
  render() {
    const dashboardTitle = "Repositories";

    return (
      <div>
        <DashboardHeader
          dashboardTitle={dashboardTitle} />
        <RepositoryFlow
          currentStep={this.state.currentStep}
          repository={this.state.repository}
          repository_types={this.props.repository_types}
          onChange={this.updateRepositoryState}
          onNextClick={this.onNextClick}
          onPreviousClick={this.onPreviousClick}
          onSaveRepository={this.saveRepository}
          onComplete={this.onComplete}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

AddRepositoryPage.propTypes = {
  company: PropTypes.object.isRequired,
  repository: PropTypes.object.isRequired,
  repository_types: PropTypes.array.isRequired,
  lab: PropTypes.object.isRequired,
  repositoryActions: PropTypes.object.isRequired
};

AddRepositoryPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const repositoryTypesToKeep = ['Inventory',
  'Knowledge Base Items',
  'Protocols',
  'Recipes',
  'Videos'];

  const repositoryTypes = _.filter(state.repositoryTypes, (repositoryType) => {
    return _.includes(repositoryTypesToKeep, repositoryType.type_name);
  });
  const repository = {
    name: ''
  };
  const repositories = state.auth.repositories;
  return {
    company: state.auth.company,
    lab: state.auth.lab,
    repository: repository,
    repository_types: _.sortBy(repositoryTypes, "type_name")
  };
}
function mapDispatchToProps(dispatch) {
  return {
    repositoryActions: bindActionCreators(repositoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRepositoryPage);
