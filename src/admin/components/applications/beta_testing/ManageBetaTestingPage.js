import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import applicationsApi from '../../../../api/applications/applicationsApi';
import * as applicationActions from '../../../actions/companies/applicationActions';
import DashboardHeader from '../../common/DashboardHeader';
import BetaTestingForm from './BetaTestingForm';
import toastr from 'toastr';
import Filters from '../Filters';

import _ from 'lodash';

class ManageBestTestingPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      betaTestingList: [],
      errors: {},
      loading: false,
      saving: false
    };
    this.updateBetaTestingListState = this.updateBetaTestingListState.bind(this);
    this.saveBetaTestingList = this.saveBetaTestingList.bind(this);
    this.updateApplicationState = this.updateApplicationState.bind(this);
  }
  componentWillMount() {
    this.loadBetaTestingList();
  }
  componentWillReceiveProps(nextProps) {
    this.loadBetaTestingList();
  }
  updateBetaTestingListState(event) {
    const field = event.target.name;
    let value = event.target.value;

    if(field == "email_addresses") {
      const email_addresses = [];
      _.each(value.split('\n'), (email_address) => {
        email_addresses.push(email_address);
      });
      value = email_addresses;
    }

    let betaTestingList = this.state.betaTestingList;
    betaTestingList[field] = value;

    return this.setState({ betaTestingList: betaTestingList });
  }
  saveBetaTestingList(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.applicationsApi.saveBetaTestingList(this.props.params.application_id, this.state.betaTestingList)
      .then(() => {
        this.loadBetaTestingList();

        this.redirect();
      })
      .catch(error => {
        toastr.error(error);

        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Beta Testing List Saved');
  }
  loadBetaTestingList() {
    this.setState({ loading: true });

    this.applicationsApi.getBetaTestingList(this.props.params.application_id)
    .then(betaTestingList => {
      this.setState({
        loading: false,
        betaTestingList: betaTestingList
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <div>
        <Filters
          company={this.props.company}
          lab={this.props.lab} />
        <DashboardHeader
          dashboardTitle="Beta Testing" />
        <BetaTestingForm
          betaTestingList={this.state.betaTestingList}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateBetaTestingListState}
          onSave={this.saveBetaTestingList}
        />
      </div>
    );
  }
}

ManageBestTestingPage.propTypes = {
  params: PropTypes.object,
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired
};

ManageBestTestingPage.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageBestTestingPage);
