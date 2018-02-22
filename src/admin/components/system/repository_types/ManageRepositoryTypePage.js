import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import repositoryTypesApi from '../../../../api/systems/repositoryTypesApi';
import intentsApi from '../../../../api/systems/intentApi';
import LoadingDots from '../../common/LoadingDots';
import Filters from '../Filters';
import DashboardHeader from '../../common/DashboardHeader';
import RepositoryTypeForm from './RepositoryTypeForm';
import toastr from 'toastr';
import _ from 'lodash';

class ManageRepositoryTypePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      repositoryType: {
        intents: []
      },
      loading: false,
      intents: [],
      selectedIntent: 0,
      errors: {},
      saving: false
    };
    this.updateRepositoryTypeState = this.updateRepositoryTypeState.bind(this);
    this.saveRepositoryType = this.saveRepositoryType.bind(this);
    this.updateSelectedIntent = this.updateSelectedIntent.bind(this);
    this.addIntent = this.addIntent.bind(this);
    this.removeIntent = this.removeIntent.bind(this);
  }
  componentWillMount() {
    intentsApi.getAllIntents()
    .then((intents) => {
      this.setState({
        intents: _.sortBy(intents, "name")
      });
    })
    .catch((err) => {
      toastr.error(err);
    });
    if(this.props.params.id) {
      this.setState({ loading: true });

      this.loadRepositoryType(this.props.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.repositoryType._id != nextProps.repositoryType._id) {
      this.setState({repositoryType: Object.assign({}, nextProps.repositoryType)});
    }
  }
  deepCopy(repository_type) {
    let newRepositoryType = Object.assign({}, repository_type);

    newRepositoryType.intents = [];
    _.each(repository_type.intents, function(intent) {
      newRepositoryType.intents.push(Object.assign({}, intent));
    });

    return newRepositoryType;
  }
  updateRepositoryTypeState(event) {
    const field = event.target.name;
    let repositoryType = this.state.repositoryType;
    repositoryType[field] = event.target.value;
    return this.setState({repositoryType: repositoryType});
  }
  updateSelectedIntent(event) {
    const selectedIntent = event.target.value;
    return this.setState({selectedIntent: selectedIntent});
  }
  addIntent(event) {
    event.preventDefault();

    const intent = _.find(this.state.intents, { _id: this.state.selectedIntent });

    if(intent) {
      let repositoryType = this.state.repositoryType;
      repositoryType.intents.push(intent);

      return this.setState({
        repositoryType: this.deepCopy(repositoryType),
        selectedIntent: 0
      });
    }
  }
  removeIntent(event, intent) {
    event.preventDefault();

    let repositoryType = this.state.repositoryType;
    _.remove(repositoryType.intents, { _id: intent._id });

    return this.setState({
      repositoryType: this.deepCopy(repositoryType),
      selectedIntent: 0
    });
  }
  loadRepositoryType(repository_type_id) {
    repositoryTypesApi.getRepositoryType(repository_type_id)
    .then(repositoryType => {
      this.setState({
        loading: false,
        repositoryType: repositoryType
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  saveRepositoryType(event) {
    event.preventDefault();
    this.setState({saving: true});

    repositoryTypesApi.saveRepositoryType(this.state.repositoryType)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Repository Type Saved');
    this.context.router.history.push('/admin/system/repository_types');
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="Repository Types" />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <RepositoryTypeForm
          repositoryType={this.state.repositoryType}
          intents={this.state.intents}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateRepositoryTypeState}
          onSave={this.saveRepositoryType}
          onUpdateSelectedIntent={this.updateSelectedIntent}
          onAddIntent={this.addIntent}
          onRemoveIntent={this.removeIntent}
        />}
      </div>
    );
  }
}

ManageRepositoryTypePage.propTypes = {
  params: PropTypes.object.isRequired,
  repositoryType: PropTypes.object.isRequired
};

ManageRepositoryTypePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRepositoryTypePage);
