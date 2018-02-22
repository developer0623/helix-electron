import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import companyApi from '../../../../api/systems/companyApi';
import DashboardHeader from '../../common/DashboardHeader';
import Filters from '../Filters';
import LoadingDots from '../../common/LoadingDots';
import CompanyList from './CompanyList';
import CompanyForm from './CompanyForm';
import toastr from 'toastr';

class ManageCompanyPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      company: {},
      loading: false,
      errors: {},
      saving: false
    };
    this.updateCompanyState = this.updateCompanyState.bind(this);
    this.saveCompany = this.saveCompany.bind(this);
  }
  componentWillMount() {
    if(this.props.params.id) {
      this.setState({ loading: true });

      companyApi.getCompany(this.props.params.id)
      .then(company => {
        this.setState({
          loading: false,
          company: company
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.company._id != nextProps.company._id) {
      this.setState({company: Object.assign({}, nextProps.company)});
    }
  }
  updateCompanyState(event) {
    const field = event.target.name;
    let company = this.state.company;
    company[field] = event.target.value;
    return this.setState({company: company});
  }
  saveCompany(event) {
    event.preventDefault();
    this.setState({saving: true});
    companyApi.saveCompany(this.state.company)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Company Saved');
    this.context.router.history.push('/admin/system/companies');
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="Companies" />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <CompanyForm
          company={this.state.company}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateCompanyState}
          onSave={this.saveCompany}
        />}
      </div>
    );
  }
}

ManageCompanyPage.propTypes = {
  params: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

ManageCompanyPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCompanyPage);
