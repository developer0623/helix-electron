import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import entitiesApi from '../../../../../api/companies/entityApi';
import * as entityActions from '../../../../actions/entityActions';
import * as repositoryActions from '../../../../actions/companies/repositoryActions';
import * as inventoryActions from '../../../../actions/labs/inventoryActions';
import DashboardHeader from './DashboardHeader';
import SetupHeader from '../../../common/SetupHeader';
import SearchRepository from '../../../common/SearchRepository';
import Filters from '../../Filters';
import EntityList from './EntityList';
import toastr from 'toastr';
import _ from 'lodash';

class EntityPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      entities: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.redirectToAddInventoryPage = this.redirectToAddInventoryPage.bind(this);
    this.redirectToAddDataSetItemPage = this.redirectToAddDataSetItemPage.bind(this);
    this.redirectToManageDataSetPage = this.redirectToManageDataSetPage.bind(this);
    this.onDeleteRepositoryClick = this.onDeleteRepositoryClick.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.pageEntities = this.pageEntities.bind(this);
    this.deleteEntity = this.deleteEntity.bind(this);
    this.onPropertiesButtonClick = this.propertiesButtonClick.bind(this);
  }
  componentWillMount() {
    this.setState({
      entities: {
        results: [],
        currentPage: 0,
        numberOfPages: 0
      }
    });
    entitiesApi.getAllEntities(this.props.params.company_id, this.props.params.repository_id, this.props.params.type)
    .then((entities) => {
      this.setState({ entities: entities });
    })
    .catch((err) => {

    });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.repository._id != nextProps.repository._id) {
      this.setState({
        entities: {
          results: [],
          currentPage: 0,
          numberOfPages: 0
        }
      });
      entitiesApi.getAllEntities(this.props.params.company_id, nextProps.repository._id, nextProps.params.type)
      .then((entities) => {
        this.setState({ entities: entities });
      })
      .catch((err) => {

      });
    }
  }
  redirectToAddDataSetItemPage() {
     this.props.history.push(`/admin/organizations/${this.props.company._id}/labs/${this.props.lab._id}/lab_members/${this.props.params.repository_id}/entities/new`);
  }
  redirectToAddInventoryPage() {
     this.props.history.push(`/admin/organizations/${this.props.company._id}/labs/${this.props.lab._id}/lab_members/new`);
  }
  redirectToManageDataSetPage() {
     this.props.history.push(`/admin/organizations/${this.props.company._id}/${this.props.params.type}`);
  }
  deleteEntity(entity, event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteEntity(this.props.company._id, this.props.params.repository_id, entity)
      .then(() => toastr.success('Entity Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  onDeleteRepositoryClick(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.repositoryActions.deleteRepository(this.props.params.company_id, this.props.repository)
      .then(() => toastr.success('Repository Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  pageEntities(data) {
    let selected = data.selected + 1;

    entitiesApi.getAllEntities(this.props.params.company_id, this.props.params.repository_id, this.props.params.type, selected)
    .then((entities) => {
      this.setState({ entities: entities });
    })
    .catch((err) => {

    });
  }
  searchChange(event) {
    const search = event.target.value;

    this.setState({search: search});

    entitiesApi.getAllEntities(this.props.params.company_id, this.props.params.repository_id, this.props.params.type, 1, search)
    .then((entities) => {
      this.setState({ entities: entities });
    })
    .catch((err) => {

    });
  }
  propertiesButtonClick(event) {
     this.props.history.push(`/admin/organizations/${this.props.params.company_id}/${this.props.params.type}/${this.props.params.repository_id}/properties`);
  }
  render() {
    return (
      <div>
        <SetupHeader
          headerText={this.props.lab.lab_name}
          onCloseClicked={this.closeClicked}
        />
        <div className="setup-header">
          <Filters
            organizationId={this.props.params.company_id}
            lab={this.props.lab}
          />
          {this.state.entities.results.length > 0 && <SearchRepository
            search={this.state.search}
            searchPlaceholder="Enter Item Name"
            searchButtonText="Add Item"
            onSearchChange={this.searchChange}
            onSearchButtonClick={this.redirectToAddDataSetItemPage}
          />}
          <EntityList
            companyId={this.props.company._id}
            labId={this.props.lab._id}
            type="lab_members"
            dataSet={this.props.repository}
            emptyStateCopy={this.props.emptyStateCopy}
            repositoryId={this.props.params.repository_id}
            entities={this.state.entities.results}
            numberOfPages={this.state.entities.max_pages}
            handlePageClick={this.pageEntities}
            onDeleteButtonClick={this.deleteEntity}
            onAddButtonClick={this.redirectToAddDataSetItemPage}
            loading={this.props.loading}
          />
        </div>
      </div>
    );
  }
}

EntityPage.propTypes = {
  params: PropTypes.object,
  repositories: PropTypes.array.isRequired,
  repository: PropTypes.object.isRequired,
  emptyStateCopy: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  repositoryActions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  company: PropTypes.object,
  lab: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let repositories = _.sortBy(state.auth.lab.lab_members, "name");

  let repository = {};
  const foundRepository = _.find(state.auth.lab.lab_members, { _id: ownProps.match.params.repository_id });
  if(foundRepository) {
    repository = foundRepository;
  }

  const emptyStateCopy = {
    primaryText: "Data Sets allow you to organization your companies information into groups that are easily searchable by researchers.",
    secondaryText: "You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items",
    addButtonText: "Add Lab Member"
  };

  let properties = [];
  if(repository && repository.attributes && repository.attributes.properties) {
    properties = _.sortBy(repository.attributes.properties, "name");
  }
  return {
    company: state.auth.company,
    lab: state.auth.lab,
    properties: properties,
    repositories: repositories,
    repository: repository,
    emptyStateCopy: emptyStateCopy,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(entityActions, dispatch),
    repositoryActions: bindActionCreators(repositoryActions, dispatch),
    inventoryActions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityPage);
