import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import applicationsApi from '../../../../api/applications/applicationsApi';
import DashboardHeader from '../../common/DashboardHeader';
import AccessControlListForm from './AccessControlListForm';
import toastr from 'toastr';
import Filters from '../Filters';

import _ from 'lodash';

class ManageAccessControlListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      application: Object.assign({}, this.props.application ),
      accessControlList: {
        email_addresses: []
      },
      loading: false,
      errors: {},
      saving: false
    };
    this.updateAccessControlListState = this.updateAccessControlListState.bind(this);
    this.saveAccessControlList = this.saveAccessControlList.bind(this);
  }
  componentWillMount() {
    this.loadAccessControlList();
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

    return this.setState({ accessControlList: accessControlList });
  }
  saveAccessControlList(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.actions.saveApplication(this.state.application)
      .then(() => {
        this.props.actions.saveAccessControlList(this.props.params.application_id, this.state.accessControlList)
        .then(() => {
          this.loadAccessControlList();

          this.redirect();
        })
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
  redirect() {
    this.setState({saving: false});
    toastr.success('Access Control List Saved');
  }
  loadAccessControlList() {
    this.setState({ loading: true });

    this.applicationsApi.getAccessControlList(this.props.params.application_id)
    .then(accessControlList => {
      this.setState({
        loading: false,
        accessControlList: accessControlList
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
          dashboardTitle="Access Control List" />
        <AccessControlListForm
          accessControlList={this.state.accessControlList.results}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateAccessControlListState}
          onSave={this.saveAccessControlList}
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
  return {
    application: state.auth.lab.application,
    company: state.auth.company,
    lab: state.auth.lab,
    accessControlList: []
  };
}
function mapDispatchToProps(dispatch) {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccessControlListPage);
