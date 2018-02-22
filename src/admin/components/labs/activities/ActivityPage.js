import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../../common/DashboardHeader';
import activityApi from '../../../../api/labs/activitiesApi';
import toastr from 'toastr';
import ActivityList from './ActivityList';

class ActivityPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      activities: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.pageActivities = this.pageActivities.bind(this);
  }
  componentWillMount() {
    this.loadActivities(this.props.lab._id);
  }
  pageActivities(data) {
    let selected = data.selected + 1;

    this.props.actions.loadActivities(this.props.lab._id, selected);
  }
  loadActivities(labId, page) {
    this.setState({ loading: true });

    activityApi.getActivities(labId ,page)
    .then(activities => {
      this.setState({
        loading: false,
        activities: activities
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Activities"
        />
        <ActivityList
          activities={this.state.activities.results}
          numberOfPages={this.state.activities.max_pages}
          handlePageClick={this.pageActivities}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

ActivityPage.propTypes = {
  lab: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    lab: state.auth.lab
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage);
