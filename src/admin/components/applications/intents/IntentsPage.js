import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as intentActions from '../../../actions/intentActions';
import DashboardHeader from '../../common/DashboardHeaderWithAdd';
import Filters from '../AdvancedFilters';
import IntentList from './IntentList';
import toastr from 'toastr';

class IntentPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddIntentPage = this.redirectToAddIntentPage.bind(this);
    this.deleteIntent = this.deleteIntent.bind(this);
    this.pageIntents = this.pageIntents.bind(this);

  }
  componentWillMount() {
    this.props.actions.loadIntents(this.props.params.application_id);
  }
  redirectToAddIntentPage() {
     this.props.history.push(`/admin/applications/${this.props.params.application_id}/intent`);
  }
  deleteIntent(intent, event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteIntent(this.props.params.application_id, intent)
      .then(() => toastr.success('Intent Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  pageIntents(data) {
    let selected = data.selected + 1;

    this.props.actions.loadIntents(this.props.params.application_id, selected);
  }
  render() {
    return (
      <div>
        <Filters
          company={this.props.company}
          lab={this.props.lab} />
        <DashboardHeader
          dashboardTitle="Intents"
          addButtonText="Add Intent"
          onAddButtonClick={this.redirectToAddIntentPage} />
        <IntentList
          intents={this.props.intents}
          numberOfPages={this.props.numberOfPages}
          handlePageClick={this.pageIntents}
          onDeleteButtonClick={this.deleteIntent}
        />
      </div>
    );
  }
}

IntentPage.propTypes = {
  params: PropTypes.object,
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  intents: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    lab: state.auth.lab,
    application: state.auth.lab.application,
    intents: state.intents.results,
    currentPage: state.intents.current_page,
    numberOfPages: state.intents.max_pages
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(intentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntentPage);
