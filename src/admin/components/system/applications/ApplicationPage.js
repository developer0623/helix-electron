import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import applicationsApi from '../../../../api/applications/applicationsApi';
import DashboardHeader from '../../common/DashboardHeader';
import SearchRepository from '../../common/SearchRepository';
import Filters from '../Filters';
import LoadingDots from '../../common/LoadingDots';
import ApplicationList from './ApplicationList';
import toastr from 'toastr';

class ApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      saving: false,
      loading: false,
      applications: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.redirectToAddApplicationPage = this.redirectToAddApplicationPage.bind(this);
    this.searchApplications = this.searchApplications.bind(this);
    this.deleteApplication = this.deleteApplication.bind(this);
    this.pageApplications = this.pageApplications.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });

    this.loadApplications();
  }
  redirectToAddApplicationPage() {
     this.props.history.push(`/admin/system/application`);
  }
  deleteApplication(application, event) {
    event.preventDefault();
    this.setState({saving: true});
    applicationsApi.deleteApplication(application)
      .then(() => {
        toastr.success('Application Deleted');

        this.setState({saving: false});
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  pageApplications(data) {
    let selected = data.selected + 1;

    this.loadApplications(selected);
  }
  searchApplications(event) {
    let search_name = event.target.value;
    this.loadApplications(1, search_name);

    this.setState({search: search_name});
  }
  loadApplications(page, search) {
    applicationsApi.getApplications(page, search)
    .then(applications => {
      this.setState({
        loading: false,
        applications: applications
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="Applications"
        />
        <SearchRepository
          search={this.state.search}
          searchPlaceholder="Search Applications"
          searchButtonText="Create Application"
          onSearchChange={this.searchApplications}
          onSearchButtonClick={this.redirectToAddApplicationPage}
        />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <ApplicationList applications={this.state.applications.results}
          numberOfPages={this.state.applications.max_pages}
          handlePageClick={this.pageApplications}
          onDeleteButtonClick={this.deleteApplication} />}
      </div>
    );
  }
}

ApplicationPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);
