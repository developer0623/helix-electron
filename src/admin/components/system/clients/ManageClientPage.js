import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clientsApi from '../../../../api/systems/clientApi';
import Filters from '../Filters';
import DashboardHeader from '../../common/DashboardHeader';
import LoadingDots from '../../common/LoadingDots';
import ClientList from './ClientList';
import ClientForm from './ClientForm';
import toastr from 'toastr';

class ManageClientPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      client: Object.assign({}, this.props.client),
      loading: false,
      errors: {},
      saving: false
    };
    this.updateClientState = this.updateClientState.bind(this);
    this.saveClient = this.saveClient.bind(this);
  }
  componentWillMount() {
    if(this.props.params.id) {
      this.setState({ loading: true });

      clientsApi.getClient(this.props.params.id)
      .then(client => {
        this.setState({
          loading: false,
          client: client
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.client._id != nextProps.client._id) {
      this.setState({client: Object.assign({}, nextProps.client)});
    }
  }
  updateClientState(event) {
      const field = event.target.name;
      let client = this.state.client;
      client[field] = event.target.value;
      return this.setState({client: client});
  }
  saveClient(event) {
    event.preventDefault();
    this.setState({saving: true});
    clientsApi.saveClient(this.state.client)
    .then(() => {
      this.redirect();
    })
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Client Saved');
    this.context.router.history.push('/admin/system/clients');
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="Clients" />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <ClientForm
          client={this.state.client}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateClientState}
          onSave={this.saveClient}
        />}
      </div>
    );
  }
}

ManageClientPage.propTypes = {
  client: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

ManageClientPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClientPage);
