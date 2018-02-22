import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import applicationsApi from '../../../../api/applications/applicationsApi';
import DashboardHeader from '../../common/DashboardHeader';
import ApplicationForm from './ApplicationForm';
import toastr from 'toastr';
import Filters from '../Filters';
import LoadingDots from '../../common/LoadingDots';
import upload from 'superagent';

import _ from 'lodash';

class ManageApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      application: {},
      loading: false,
      errors: {},
      saving: false
    };
    this.updateApplicationState = this.updateApplicationState.bind(this);
    this.saveApplication = this.saveApplication.bind(this);
    this.uploadSmallLogo = this.uploadSmallLogo.bind(this);
    this.uploadLargeLogo = this.uploadLargeLogo.bind(this);
  }
  componentWillMount() {
    if(this.props.params.id) {
      this.setState({ loading: true });

      this.loadApplication(this.props.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.application._id != nextProps.application._id) {
      this.setState({application: Object.assign({}, nextProps.application)});
    }
  }
  uploadSmallLogo(files) {
    this.setState({saving: true});
    upload.post(`/api/applications/${this.state.application._id}/upload/small_logo`)
    .attach('filename', files[0])
    .end((err, res) => {
      if (err) {
        toastr.error(err);
        this.setState({saving: false});
      } else {
        let application = this.state.application;
        application["small_logo"] = `/applications/${application._id}/logos/small-logo.png`;

        this.setState({application: this.deepCopy(application) });
        this.setState({saving: false});
      }
    });
  }
  uploadLargeLogo(files) {
    this.setState({saving: true});
    upload.post(`/api/applications/${this.state.application._id}/upload/large_logo`)
    .attach('filename', files[0])
    .end((err, res) => {
      if (err) {
        this.setState({saving: false});
        toastr.error(err);
      }
      else {
        let application = this.state.application;
        application["large_logo"] = `/applications/${application._id}/logos/large-logo.png`;

        this.setState({application: this.deepCopy(application) });
        this.setState({saving: false});
      }
    });
  }
  updateApplicationState(event) {
    const field = event.target.name;
    let value = event.target.value;

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
  loadApplication(application_id) {
    applicationsApi.getApplication(application_id)
    .then(application => {
      this.setState({
        loading: false,
        application: application
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  saveApplication(event) {
    event.preventDefault();
    this.setState({saving: true});
    applicationsApi.saveApplication(this.state.application)
    .then(() => this.redirect())
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Application Saved');
    this.context.router.history.push(`/admin/system/applications`);
  }
  deepCopy(application) {
    let newApplication = Object.assign({}, application);

    return newApplication;
  }
  render() {
    return (
      <div>
        <Filters
          application_id={this.props.params.application_id} />
        <DashboardHeader
          dashboardTitle="Application" />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <ApplicationForm
          application={this.state.application}
          companies={this.props.companies}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateApplicationState}
          onSave={this.saveApplication}
          onUploadSmallLogo={this.uploadSmallLogo}
          onUploadLargeLogo={this.uploadLargeLogo}
        />}
      </div>
    );
  }
}

ManageApplicationPage.propTypes = {
  params: PropTypes.object,
  application: PropTypes.object.isRequired,
  companies: PropTypes.array.isRequired
};

ManageApplicationPage.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  return {
    companies: state.auth.companies
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageApplicationPage);
