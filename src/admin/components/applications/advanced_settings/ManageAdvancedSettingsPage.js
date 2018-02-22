import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as applicationActions from '../../../actions/companies/applicationActions';
import DashboardHeader from '../../common/DashboardHeader';
import AdvancedSettingsForm from './AdvancedSettingsForm';
import toastr from 'toastr';
import Filters from '../AdvancedFilters';
import _ from 'lodash';

class AdvancedSettingsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      application: Object.assign({}, this.props.application),
      errors: {},
      saving: false
    };
    this.updateApplicationState = this.updateApplicationState.bind(this);
    this.updateAlexaDirective = this.updateAlexaDirective.bind(this);
    this.updateExamplePhrase = this.updateExamplePhrase.bind(this);
    this.saveApplication = this.saveApplication.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.application._id != nextProps.application._id) {
      this.setState({application: Object.assign({}, nextProps.application)});
    }
  }
  updateAlexaDirective(event) {
    const field = event.target.name;
    let value = (event.target.type == "checkbox") ? event.target.checked : event.target.value;

    let application = this.state.application;
    application.alexa_directives[field] = value;

    return this.setState({application: this.deepCopy(application) });
  }
  updateExamplePhrase(event, example_phrase, index) {
    let application = this.state.application;
    application.example_phrases[index] = example_phrase;

    return this.setState({application: this.deepCopy(application) });
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
  saveApplication(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveApplication(this.state.application)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Application Saved');
  }
  deepCopy(application) {
    let newApplication = Object.assign({}, application);

    return newApplication;
  }
  render() {
    return (
      <div>
        <Filters
          company={this.props.company}
          lab={this.props.lab} />
        <DashboardHeader
          dashboardTitle="Advanced Configuration" />
        <AdvancedSettingsForm
          application={this.state.application}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateApplicationState}
          onChangeAlexaDirective={this.updateAlexaDirective}
          onChangeExamplePhrase={this.updateExamplePhrase}
          onSave={this.saveApplication}
        />
      </div>
    );
  }
}

AdvancedSettingsPage.propTypes = {
  params: PropTypes.object,
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

AdvancedSettingsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    lab: state.auth.lab,
    application: state.auth.lab.application
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSettingsPage);
