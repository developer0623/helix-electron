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

class ManageApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      application: this.props.application,
      errors: {},
      saving: false
    };
    this.updateApplicationState = this.updateApplicationState.bind(this);
    this.saveApplication = this.saveApplication.bind(this);
    this.onCloseClicked = this.closeClicked.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.application._id != nextProps.application._id) {
      this.setState({application: Object.assign({}, nextProps.application)});
    }
  }
  updateApplicationState(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    let application = this.state.application;
    application[field] = value;
    return this.setState({application: application});
  }
  saveApplication(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.actions.saveApplication(this.props.company._id, this.state.application)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  closeClicked(event) {
    event.preventDefault();

     this.props.history.push(`/admin/applications`);
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Application Saved');
    this.context.router.history.push(`/admin/applications`);
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Applications"
        />
        <div className="setup-header">

        </div>
      </div>
    );
  }
}

ManageApplicationPage.propTypes = {
  company: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageApplicationPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    application: state.auth.application
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageApplicationPage);
