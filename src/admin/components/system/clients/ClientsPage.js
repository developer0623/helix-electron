import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import clientsApi from '../../../../api/systems/clientApi';
import DashboardHeader from '../../common/DashboardHeader';
import SearchRepository from '../../common/SearchRepository';
import Filters from '../Filters';
import LoadingDots from '../../common/LoadingDots';
import ClientList from './ClientList';
import ClientsEmptyStatus from './ClientsEmptyState';
import toastr from 'toastr';

class ClientPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      saving: false,
      loading: false,
      clients: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.redirectToAddClientPage = this.redirectToAddClientPage.bind(this);
    this.searchClients = this.searchClients.bind(this);
    this.pageClients = this.pageClients.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });

    this.loadClients();
  }
  redirectToAddClientPage() {
     this.props.history.push('/admin/system/client');
  }
  deleteClient(client, event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteClient(client)
      .then(() => toastr.success('Client Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  pageClients(data) {
    let selected = data.selected + 1;

    this.loadClients(selected);
  }
  searchClients(event) {
    let client_name = event.target.value;
    this.loadClients(1, client_name);

    this.setState({search: client_name});
  }
  loadClients(page, client_name) {
    clientsApi.getAllClients(page, client_name)
    .then(clients => {
      this.setState({
        loading: false,
        clients: clients
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
          dashboardTitle="Clients"
        />
        <SearchRepository
          search={this.state.search}
          searchPlaceholder="Search Client Name"
          searchButtonText="Add Client"
          onSearchChange={this.searchClients}
          onSearchButtonClick={this.redirectToAddClientPage}
        />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <ClientList
          clients={this.state.clients.results}
          loading={this.state.loading}
          numberOfPages={this.state.clients.max_pages}
          handlePageClick={this.pageClients}
          onDeleteButtonClick={this.deleteClient}
        />}
      </div>
    );
  }
}

ClientPage.propTypes = {
  actions: PropTypes.object.isRequired
};

ClientPage.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
