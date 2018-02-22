import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as intentLogActions from '../../../../actions/intentLogActions';
import DashboardHeader from '../../../common/DashboardHeader';
import IntentLogList from './IntentLogList';

class IntentLogPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.pageIntentLogs = this.pageIntentLogs.bind(this);

    this.state = {
      intentLogs: [],
      numberOfPages: 0
    };
  }
  componentWillMount() {
    this.props.actions.loadIntentLogs(this.props.application._id);
  }
  pageIntentLogs(data) {
    let selected = data.selected + 1;

    this.props.actions.loadIntentLogs(this.props.application._id, selected);
  }
  render() {
    return (
      <div>
        <DashboardHeader dashboardTitle="Intent Logs" />
        <IntentLogList intentLogs={this.state.intentLogs}
          numberOfPages={this.state.numberOfPages}
          handlePageClick={this.pageIntentLogs}
        />
      </div>
    );
  }
}

IntentLogPage.propTypes = {
  application: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let application = {};

  if(state.auth.applications.length > 0) {
    application = state.auth.applications[0];
  }

  return {
    application: application
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(intentLogActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntentLogPage);
