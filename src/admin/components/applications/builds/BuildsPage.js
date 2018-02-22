import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import applicationsApi from '../../../../api/applications/applicationsApi';
import DashboardHeader from '../../common/DashboardHeaderWithAdd';
import LogsList from './BuildsList';
import Filters from '../AdvancedFilters';
import LogsEmptyStatus from './BuildsEmptyState';
import toastr from 'toastr';

class LogsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      loading: false,
      builds: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.pageBuilds = this.pageBuilds.bind(this);
    this.startBuild = this.startBuild.bind(this);
  }
  componentWillMount() {
    this.setState({loading: true});

    this.loadApplicationBuilds(this.props.application._id);
  }
  pageBuilds(data) {
    let selected = data.selected + 1;

    this.loadApplicationBuilds(this.props.application._id, selected);
  }
  startBuild(event) {
    event.preventDefault();
    this.setState({saving: true});

    applicationsApi.startApplicationBuild(this.props.application._id)
    .then(build => {
      toastr.success('Build Started');

      this.setState({saving: false});
    })
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }
  loadApplicationBuilds() {
    applicationsApi.getApplicationBuilds(this.props.application._id)
    .then(builds => {
      this.setState({
        loading: false,
        builds: builds
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
          dashboardTitle="Builds"
          addButtonText="Start a Build"
          onAddButtonClick={this.startBuild} />
        <LogsList builds={this.state.builds.results}
          numberOfPages={this.state.builds.max_pages}
          handlePageClick={this.pageBuilds}
        />
      </div>
    );
  }
}

LogsPage.propTypes = {
  params: PropTypes.object,
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    lab: state.auth.lab,
    application: state.auth.lab.application
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LogsPage);
