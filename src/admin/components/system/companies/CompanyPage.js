import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import companyApi from '../../../../api/systems/companyApi';
import Filters from '../Filters';
import LoadingDots from '../../common/LoadingDots';
import DashboardHeader from '../../common/DashboardHeader';
import SearchRepository from '../../common/SearchRepository';
import CompanyList from './CompanyList';
import toastr from 'toastr';

class CompanyPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      loading: false,
      companies: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.redirectToAddCompanyPage = this.redirectToAddCompanyPage.bind(this);
    this.searchCompanies = this.searchCompanies.bind(this);
    this.pageCompanies = this.pageCompanies.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });

    this.loadCompanies();
  }
  redirectToAddCompanyPage() {
     this.props.history.push('/admin/system/company');
  }
  deleteCompany(company, event) {
    event.preventDefault();
    this.setState({saving: true});
    companyApi.deleteCompany(company)
      .then(() => toastr.success('Company Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  pageCompanies(data) {
    let selected = data.selected + 1;

    this.loadCompanies(selected);
  }
  searchCompanies(event) {
    let company_name = event.target.value;
    this.loadCompanies(1, company_name);

    this.setState({search: company_name});
  }
  loadCompanies(page, company_name) {
    companyApi.getCompaniesPaged(page, company_name)
    .then(companies => {
      this.setState({
        loading: false,
        companies: companies
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
          dashboardTitle="Companies"
        />
        <SearchRepository
          search={this.state.search}
          searchPlaceholder="Search Company Name"
          searchButtonText="Add Company"
          onSearchChange={this.searchCompanies}
          onSearchButtonClick={this.redirectToAddCompanyPage}
        />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <CompanyList
          companies={this.state.companies.results}
          numberOfPages={this.state.companies.max_pages}
          handlePageClick={this.pageCompanies}
          onDeleteButtonClick={this.deleteCompany}
        />}
      </div>
    );
  }
}

CompanyPage.propTypes = { };

CompanyPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);
