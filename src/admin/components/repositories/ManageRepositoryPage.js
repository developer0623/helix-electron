import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../common/DashboardHeader';
import SetupHeader from '../common/SetupHeader';
import Filters from '../common/repositories/Filters';
import RepositoryForm from '../common/repositories/RepositoryForm';
import toastr from 'toastr';
import _ from 'lodash';

import * as repositoryActions from '../../actions/companies/repositoryActions';

class ManageRepositoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      repository: this.deepCopyRepository(this.props.repository),
      errors: {},
      saving: false
    };
    this.updateRepositoryState = this.updateRepositoryState.bind(this);
    this.saveRepositoryState = this.saveRepositoryState.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.repository._id != nextProps.repository._id) {
      this.setState({repository: Object.assign({}, nextProps.repository)});
    }
  }
  deepCopyRepository(repository) {
    const newRepository = Object.assign({}, repository);
    newRepository.attributes = {};

    const properties = repository.attributes.properties;
    const newProperties = [];

    _.each(properties, (property) => {
      newProperties.push(property);
    });

    newRepository.attributes.properties = newProperties;

    return newRepository;
  }
  updateRepositoryState(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    let repository = this.state.repository;
    repository[field] = value;
    return this.setState({repository: repository});
  }
  saveRepositoryState(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.actions.saveRepository(this.props.company._id, this.state.repository)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Repository Saved');

    this.context.router.history.push(`/admin/repositories`);
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Create a Repository"
        />
        <div className="setup-header">
          <RepositoryForm
            repository={this.state.repository}
            errors={this.state.errors}
            saving={this.state.saving}
            onChange={this.updateRepositoryState}
            onSave={this.saveRepositoryState}
          />
        </div>
      </div>
    );
  }
}

ManageRepositoryPage.propTypes = {
  company: PropTypes.object.isRequired,
  repository: PropTypes.object.isRequired,
  repositories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageRepositoryPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const company = state.auth.company;

  const repositoryId =  ownProps.match.params.id;
  let repository = {
    name: ''
  };
  if (repositoryId && company.repositories.length > 0) {
    repository = getRepositoryById(company.repositories, repositoryId);
  }
  return {
    company: company,
    repositories:  company.repositories,
    repository: repository
  };
}
function getRepositoryById(repositories, id) {
  const repository = repositories.filter(repository => repository._id == id);
  if (repository) return repository[0];
  return null;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(repositoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRepositoryPage);
