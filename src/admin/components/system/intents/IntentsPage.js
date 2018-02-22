import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import intentsApi from '../../../../api/systems/intentApi';
import DashboardHeader from '../../common/DashboardHeader';
import SearchRepository from '../../common/SearchRepository';
import Filters from '../Filters';
import LoadingDots from '../../common/LoadingDots';
import IntentList from './IntentList';
import toastr from 'toastr';

class IntentPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      loading: false,
      intents: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.redirectToAddIntentPage = this.redirectToAddIntentPage.bind(this);
    this.deleteIntent = this.deleteIntent.bind(this);
    this.pageIntents = this.pageIntents.bind(this);
    this.searchIntents = this.searchIntents.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });

    this.loadIntents();
  }
  redirectToAddIntentPage() {
     this.props.history.push(`/admin/system/intent`);
  }
  deleteIntent(intent, event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteIntent(intent)
      .then(() => toastr.success('Intent Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  pageIntents(data) {
    let selected = data.selected + 1;

    this.loadIntents(selected);
  }
  searchIntents(event) {
    let name = event.target.value;
    this.loadIntents(1, name);

    this.setState({search: name});
  }
  loadIntents(page, intent_name) {
    intentsApi.getIntents(page, intent_name).then(intents => {
      this.setState({
        loading: false,
        intents: intents
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
          dashboardTitle="Intents"
        />
        <SearchRepository
          search={this.state.search}
          searchPlaceholder="Search Intent Name"
          searchButtonText="Add Intent"
          onSearchChange={this.searchIntents}
          onSearchButtonClick={this.redirectToAddIntentPage}
        />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <IntentList
          intents={this.state.intents.results}
          numberOfPages={this.state.intents.max_pages}
          handlePageClick={this.pageIntents}
          onDeleteButtonClick={this.deleteIntent}
        />}
      </div>
    );
  }
}

IntentPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(IntentPage);
