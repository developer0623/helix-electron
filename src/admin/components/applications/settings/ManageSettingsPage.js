import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as applicationActions from '../../../actions/companies/applicationActions';
import DashboardHeader from '../../common/DashboardHeader';
import SettingsForm from './SettingsForm';
import toastr from 'toastr';
import Filters from '../Filters';
import upload from 'superagent';
import _ from 'lodash';
import './ManageSettingsPage.css';
import LoadingSpinner from '../../common/LoadingSpinner';

class ManageSettingsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      application: Object.assign({}, this.deepCopy(this.props.application)),
      welcomeBackgroundUrl: (this.props.application && this.props.application.default_welcome_background) ? this.props.application.default_welcome_background : null,
      errors: {},
      keyword: '',
      saving: false
    };
    this.updateApplicationState = this.updateApplicationState.bind(this);
    this.saveApplication = this.saveApplication.bind(this);
    this.uploadLogo = this.uploadLogo.bind(this);
    this.uploadWelcomeBackground = this.uploadWelcomeBackground.bind(this);
    this.addKeyword = this.addKeyword.bind(this);
    this.removeKeyword = this.removeKeyword.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.isEnabledLanguage = this.isEnabledLanguage.bind(this);
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.application._id != nextProps.application._id) {
      this.setState({
        application: Object.assign({}, this.deepCopy(nextProps.application)),
        welcomeBackgroundUrl: (nextProps.application.default_welcome_background) ? nextProps.application.default_welcome_background : null});
    }
  }
  uploadLogo(files) {
    this.setState({saving: true});

    upload.post(`/api/applications/${this.state.application._id}/upload/logo`)
    .attach('filename', files[0])
    .end((err, res) => {
      if (err) {
        toastr.error(err);
        this.setState({saving: false});
      } else {
        let application = this.state.application;
        application["small_logo"] = `/applications/${application._id}/logos/small-logo.png`;
        application["large_logo"] = `/applications/${application._id}/logos/large-logo.png`;

        this.setState({application: this.deepCopy(application) });
        this.setState({saving: false});
      }
    });
  }
  uploadWelcomeBackground(files) {
    this.setState({saving: true});

    upload.post(`/api/applications/${this.state.application._id}/upload/welcome_background`)
    .attach('filename', files[0])
    .end((err, res) => {
      if (err) {
        toastr.error(err);
        this.setState({saving: false});
      } else {
        const application = this.state.application;
        const fileLocation = res.body.file_location;
        const filename = res.body.file_name;

        application.default_welcome_background = filename;

        this.setState({application: this.deepCopy(application) });
        this.setState({welcomeBackgroundUrl: fileLocation});
        this.setState({saving: false});
      }
    });
  }
  addKeyword(event) {
    event.preventDefault();

    const keyword = this.state.keyword;
    const application = this.state.application;

    application.keywords.push(keyword);

    return this.setState({
      application: this.deepCopy(application),
      keyword: ''
    });
  }
  removeKeyword(event, keyword) {
    event.preventDefault();

    let application = this.state.application;

    application.keywords = _.pull(application.keywords, keyword);

    return this.setState({application: this.deepCopy(application) });
  }
  changeKeyword(event) {
    event.preventDefault;

    const keyword = event.target.value;

    return this.setState({keyword: keyword });
  }
  isEnabledLanguage(platform, locale) {
    const application = this.state.application;
    const languages = application["languages"];

    const platformLanguages = _.find(languages, { platform: platform });

    if(!platformLanguages) { return false; }

    const enabledLanguage = _.find(platformLanguages.enabled_languages, { locale: locale });

    return enabledLanguage;
  }
  updateLanguage(event, platform, locale, enabled) {
    const application = this.state.application;
    const languages = application["languages"];

    let platformLanguages = _.find(languages, { platform: platform });
    if(!platformLanguages) {
      platformLanguages = {
        platform: platform,
        enabled_languages: []
      };
      languages.push(platformLanguages);
    }
    if(enabled && !_.find(platformLanguages.enabled_languages, { locale: locale })) {
      platformLanguages.enabled_languages.push({
        locale: locale
      });
    }
    if(!enabled && _.find(platformLanguages.enabled_languages, { locale: locale })) {
      _.remove(platformLanguages.enabled_languages, { locale: locale});
    }

    return this.setState({applicationActionsation: this.deepCopy(application) });
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

    this.setState({errors: errors});
		const application = this.state.application;

		if (_.isEmpty(application.name) || application.name.length < 3) {
			errors.name = 'Name is required and must be at least 3 characters.';
			formIsValid = false;
		}
    if (_.isEmpty(application.invocation_name) || application.invocation_name.length < 3) {
      errors.invocation_name = 'Invocation Phrase is required and must be at least 3 characters.';
      formIsValid = false;
    }
    if (_.isEmpty(application.summary)) {
      errors.summary = 'Summary is required.';
      formIsValid = false;
    }
    if (_.isEmpty(application.description)) {
      errors.description = 'Description is required.';
      formIsValid = false;
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
    this.props.actions.saveApplication(this.props.company._id, this.state.application)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Application Saved');

    this.context.router.history.push(`/admin/dashboard`);
  }
  deepCopy(application) {
    let newApplication = Object.assign({}, application);

    newApplication.languages = [];
    _.each(application.languages, (language) => {
      const newLanguage = Object.assign({}, language);
      newLanguage.enabled_languages = [];
      _.each(language.enabled_languages, (enabled_language) => {
        newLanguage.enabled_languages.push(Object.assign({}, enabled_language));
      });

      newApplication.languages.push(newLanguage);
    });
    newApplication.keywords = [];
    _.each(application.keywords, (keyword) => {
      newApplication.keywords.push(keyword);
    });

    return newApplication;
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle={this.props.application.name} />
        {this.props.application._id ?
          <SettingsForm
            application={this.state.application}
            welcomeBackgroundUrl={this.state.welcomeBackgroundUrl}
            errors={this.state.errors}
            saving={this.state.saving}
            onChange={this.updateApplicationState}
            onSave={this.saveApplication}
            isEnabledLanguage={this.isEnabledLanguage}
            onUpdateLanguage={this.updateLanguage}
            onUploadLogo={this.uploadLogo}
            onUploadWelcomeBackground={this.uploadWelcomeBackground}
            onAddKeyword={this.addKeyword}
            onRemoveKeyword={this.removeKeyword}
            onChangeKeyword={this.changeKeyword}
            keyword={this.state.keyword}
          />
        : <LoadingSpinner />
      }
      </div>
    );
  }
}

ManageSettingsPage.propTypes = {
  params: PropTypes.object,
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageSettingsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const applicationId = ownProps.match.params.id;

  let application = {
    name: '',
    invocation_name: '',
    summary: '',
    description: '',
    keywords: []
  };

  const found = _.find(state.auth.applications, { _id: applicationId });
  if(found) {
    application = found;
  }
  return {
    company: state.auth.company,
    lab: state.auth.lab,
    application: application
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSettingsPage);
