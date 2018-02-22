import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import repositoryTypesApi from '../../../../api/systems/repositoryTypesApi';
import DashboardHeader from '../../common/DashboardHeader';
import SearchRepository from '../../common/SearchRepository';
import Filters from '../Filters';
import LoadingDots from '../../common/LoadingDots';
import RepositoryTypeList from './RepositoryTypeList';
import toastr from 'toastr';

class RepositoryTypesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      loading: false,
      repositoryTypes: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.redirectToAddRepositoryTypePage = this.redirectToAddRepositoryTypePage.bind(this);
    this.searchRepositoryTypes = this.searchRepositoryTypes.bind(this);
    this.pageRepositoryTypes = this.pageRepositoryTypes.bind(this);
    this.deleteRepositoryType = this.deleteRepositoryType.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });

    this.loadRepositoryTypes();
  }
  redirectToAddRepositoryTypePage() {
     this.props.history.push(`/admin/system/repository_type`);
  }
  deleteRepositoryType(repositoryType, event) {
    event.preventDefault();

    this.setState({saving: true});
    repositoryTypesApi.deleteRepositoryType(repositoryType)
    .then(() => toastr.success('Repository Type Deleted'))
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }
  pageRepositoryTypes(data) {
    let selected = data.selected + 1;

    this.loadRepositoryTypes(selected);
  }
  searchRepositoryTypes(event) {
    let name = event.target.value;
    this.loadRepositoryTypes(1, name);

    this.setState({search: name});
  }
  loadRepositoryTypes(page, repository_type) {
    repositoryTypesApi.getRepositoryTypesPaged(page, repository_type).then(repositoryTypes => {
      this.setState({
        loading: false,
        repositoryTypes: repositoryTypes
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
          dashboardTitle="Repository Types"
        />
        <SearchRepository
          search={this.state.search}
          searchPlaceholder="Search Repository Types"
          searchButtonText="Add Repository Type"
          onSearchChange={this.searchRepositoryTypes}
          onSearchButtonClick={this.redirectToAddRepositoryTypePage}
        />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <RepositoryTypeList
          repositoryTypes={this.state.repositoryTypes.results}
          numberOfPages={this.state.repositoryTypes.max_pages}
          handlePageClick={this.pageRepositoryTypes}
          onDeleteButtonClick={this.deleteRepositoryType}
        />}
      </div>
    );
  }
}

RepositoryTypesPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryTypesPage);
