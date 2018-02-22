import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../common/DashboardHeader';
//import EmptyState from '../common/EmptyState';
import Filters from './Filters';
import SetupHeader from '../common/SetupHeader';
import applicationsApi from '../../../api/labs/applicationsApi';
import toastr from 'toastr';
import LabForm from '../common/EmptyState';
import Step1Form from './new/Step1Form';
import _ from 'lodash';

import * as applicationActions from '../../actions/labs/applicationActions';

class SetupApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      application: {},
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

    return this.setState({application: application});
  }
  saveApplication(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.applicationActions.saveApplication(this.props.lab._id, this.state.application)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  closeClicked(event) {
    event.preventDefault();

     this.props.history.push(`/admin/labs/applications/settings`);
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
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  applicationActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    lab: state.auth.lab
  };
}
function mapDispatchToProps(dispatch) {
  return {
    applicationActions: bindActionCreators(applicationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupApplicationPage);
