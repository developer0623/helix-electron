import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as applicationActions from '../../../actions/companies/applicationActions';
import DashboardHeader from '../../common/DashboardHeader';
import CertificationForm from './CertificationForm';
import toastr from 'toastr';
import Filters from '../Filters';

import _ from 'lodash';

class ManageAccessControlListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      application: Object.assign({}, this.props.application),
      accessControlList: Object.assign({}, this.props.accessControlList),
      errors: {},
      saving: false
    };
    this.updateAccessControlListState = this.updateAccessControlListState.bind(this);
    this.saveAccessControlList = this.saveAccessControlList.bind(this);
    this.updateApplicationState = this.updateApplicationState.bind(this);
  }
  componentWillMount() {
    this.props.actions.loadAccessControlList(this.props.params.application_id);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({accessControlList: Object.assign({}, nextProps.accessControlList)});
  }
  updateAccessControlListState(event) {
    const field = event.target.name;
    let value = event.target.value;

    if(field == "email_addresses") {
      const email_addresses = [];
      _.each(value.split('\n'), (email_address) => {
        email_addresses.push(email_address);
      });
      value = email_addresses;
    }

    let accessControlList = this.state.accessControlList;
    accessControlList[field] = value;

    return this.setState({ accessControlList: this.deepCopy(accessControlList) });
  }
  saveAccessControlList(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.actions.saveApplication(this.state.application)
      .then(() => {
        this.props.actions.saveAccessControlList(this.props.params.application_id, this.state.accessControlList)
          .then(() => this.redirect())
          .catch(error => {
            toastr.error(error);
            this.setState({saving: false});
          });
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
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
  redirect() {
    this.setState({saving: false});
    toastr.success('Access Control List Saved');
  }
  deepCopy(accessControlList) {
    let newAccessControlList = Object.assign({}, accessControlList);

    return newAccessControlList;
  }
  render() {
    return (
      <div>
        <Filters
          company={this.props.company}
          lab={this.props.lab} />
        <DashboardHeader
          dashboardTitle="Certification" />
        <CertificationForm
          application={this.state.application}
          accessControlList={this.state.accessControlList}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateAccessControlListState}
          onSave={this.saveAccessControlList}
          onUpdateApplication={this.updateApplicationState}
        />
      </div>
    );
  }
}

ManageAccessControlListPage.propTypes = {
  params: PropTypes.object,
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  accessControlList: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageAccessControlListPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let accessControlList = {
    email_addresses: []
  };
  if (state.accessControlList) {
    accessControlList = state.accessControlList;
  }
  return {
    company: state.auth.company,
    lab: state.auth.lab,
    application: state.auth.lab.application,
    accessControlList: accessControlList
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccessControlListPage);
