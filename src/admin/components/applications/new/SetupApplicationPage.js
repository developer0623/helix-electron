import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../../common/DashboardHeader';
//import EmptyState from '../../common/EmptyState';
import Filters from '../Filters';
import SetupHeader from '../../common/SetupHeader';
import applicationsApi from '../../../../api/companies/applicationsApi';
import toastr from 'toastr';
import LabForm from '../../common/EmptyState';
import Step1Form from './Step1Form';
import _ from 'lodash';

import * as applicationActions from '../../../actions/companies/applicationActions';

class SetupApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      application: this.props.application,
      currentStep: 1,
      errors: {},
      saving: false
    };
    this.updateApplicationState = this.updateApplicationState.bind(this);
    this.saveApplication = this.saveApplication.bind(this);
    this.closeClicked = this.closeClicked.bind(this);
  }
  updateApplicationState(event) {
    const field = event.target.name;
    let value = (event.target.type == "checkbox") ? event.target.checked : event.target.value;

    if(field == "keywords") {
      const keywords = [];
      _.each(value.split('\n'), (keyword) => {
        keywords.push(keyword);
      });
      value = keywords;
    }
    if(field == "example_phrases") {
      const example_phrases = [];
      _.each(value.split('\n'), (example_phrase) => {
        example_phrases.push(example_phrase);
      });
      value = example_phrases;
    }
    let application = this.state.application;
    application[field] = value;

    return this.setState({application: this.deepCopy(application) });
  }
  validateForm() {
    const errors = {};
    let formIsValid = true;

    this.setState({errors :{}});

    const application = this.state.application;

    if(this.state.currentStep == 1) {
      if (application.name.length < 3) {
        errors.name = 'Name is required and must be at least 3 characters.';
        formIsValid = false;
      }
      if (application.invocation_name.length < 3) {
        errors.invocation_name = 'Invocation Name is required and must be at least 3 characters.';
        formIsValid = false;
      }
      if (application.description.length == 0) {
        errors.description = 'A short description of the skill is required.';
        formIsValid = false;
      }
    }
    this.setState({errors: errors});
    return formIsValid;
  }
  saveApplication(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }
    this.setState({saving: true});
    this.props.actions.saveApplication(this.state.application)
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
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Setup a Virtual Assistant"
        />
        <Step1Form
          application={this.state.application}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateApplicationState}
          onSave={this.saveApplication}
        />
      </div>
    );
  }
}

SetupApplicationPage.propTypes = {
  application: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const application = {
    name: '',
    invocation_name: '',
    description: ''
  };
  return {
    application: application,
    company: state.auth.company
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupApplicationPage);
