import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as repositoryActions from '../../../actions/companies/repositoryActions';
import DashboardHeader from '../../common/DashboardHeader';
import Filters from '../Filters';
import DataSetForm from './RepositoryForm';
import toastr from 'toastr';
import _ from 'lodash';

class ManageDataSetPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dataSet: this.props.dataSet,
      errors: {},
      saving: false
    };
    this.updateDataSetState = this.updateDataSetState.bind(this);
    this.saveDataSet = this.saveDataSet.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.dataSet._id != nextProps.dataSet._id) {
      this.setState({dataSet: Object.assign({}, nextProps.dataSet)});
    }
  }
  updateDataSetState(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    let dataSet = this.state.dataSet;
    dataSet[field] = value;
    return this.setState({dataSet: dataSet});
  }
  saveDataSet(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.actions.saveDataSet(this.props.params.company_id, this.state.dataSet)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Data Set Saved');
    this.context.router.history.push(`/admin/organizations/${this.props.params.company_id}/data_sets`);
  }
  render() {
    let dashboardTitle="Add Data Set";
    if(this.state.dataSet._id) {
      dashboardTitle = "Edit Data Set";
    }
    return (
      <div>
        <Filters
          companyId={this.props.params.company_id}
          dataSets={this.props.dataSets} />
        <DashboardHeader
          dashboardTitle={dashboardTitle} />
        <DataSetForm
          dataSet={this.state.dataSet}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateDataSetState}
          onSave={this.saveDataSet}
        />
      </div>
    );
  }
}

ManageDataSetPage.propTypes = {
  dataSet: PropTypes.object.isRequired,
  dataSets: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

ManageDataSetPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const cachedCompany = JSON.parse(localStorage.getItem("company"));

  let company = state.auth.company;
  if(cachedCompany) {
    company = cachedCompany;
  }

  const dataSetId =  ownProps.match.params.id;
  let dataSet = {
    name: ''
  };
  const dataSets = _.filter(company.data_sets, {"type": `${ownProps.route.type}`});

  if (dataSetId && dataSets.length > 0) {
    dataSet = getDataSetById(dataSets, dataSetId);
  }
  return {
    dataSets: dataSets,
    dataSet: dataSet
  };
}
function getDataSetById(dataSets, id) {
  const dataSet = dataSets.filter(dataSet => dataSet._id == id);
  if (dataSet) return dataSet[0];
  return null;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(repositoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDataSetPage);
