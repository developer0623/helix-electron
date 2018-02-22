import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import entitiesApi from '../../../../api/companies/entityApi';
import * as entityActions from '../../../actions/entityActions';
import * as repositoryActions from '../../../actions/companies/repositoryActions';
import SetupHeader from '../../common/SetupHeader';
import DashboardHeader from '../../common//DashboardHeader';
import SearchRepository from '../../common/SearchRepository';
import Filters from '../../common/repositories/Filters';
import EntityList from './EntityList';
import toastr from 'toastr';
import _ from 'lodash';
import EmptyState from './EmptyStateTemplates/InventoryEmptyState';
import EntityListItemTemplate from './ListTemplates/EntityListItemTemplate';
import InventoryItemListHeaderTemplate from './ListTemplates/InventoryItemListHeaderTemplate';
import InventoryItemListItemTemplate from './ListTemplates/InventoryItemListItemTemplate';

import AbstractFactory from './Factories/AbstractFactory';
import CalculatorFactory from './Factories/CalculatorFactory';
import KnowledgeBaseFactory from './Factories/KnowledgeBaseFactory';
import ProductFactory from './Factories/ProductFactory';
import ProtocolFactory from './Factories/ProtocolFactory';
import RecipeFactory from './Factories/RecipeFactory';
import VideoFactory from './Factories/VideoFactory';

class EntityPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      repository: this.props.repository,
      entities: {
        results: [],
        current_page: 0,
        max_pages: 0
      },
      loading: false
    };
    this.redirectToAddDataSetPage = this.redirectToAddDataSetPage.bind(this);
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
    this.setState({ loading: true });
    this.loadEntities();
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.repository._id != nextProps.repository._id) {
      this.setState({
        repository: nextProps.repository,
        entities: {
          results: [],
          currentPage: 0,
          numberOfPages: 0
        },
        loading: true
      }, () => {
        this.loadEntities();
      });
    }
  }
  redirectToAddDataSetItemPage() {
     this.props.history.push(`/admin/inventories/${this.props.repository._id}/entities/new`);
  }
  redirectToAddDataSetPage() {
     this.props.history.push(`/admin/inventories/new`);
  }
  redirectToManageDataSetPage() {
     this.props.history.push(`/admin/inventories}`);
  }
  loadEntities(page, search) {
    entitiesApi.getAllEntities(this.props.company._id, this.props.repository._id, null, page, search)
    .then((entities) => {
      this.setState({
        loading: false,
        entities: entities
      });
    })
    .catch((err) => {
      this.setState({ loading: false });
    });
  }
  deleteEntity(entity, event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteEntity(this.props.company._id, this.state.repository._id, entity)
      .then(() => toastr.success('Entity Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  onDeleteRepositoryClick(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.repositoryActions.deleteRepository(this.props.company._id, this.props.repository)
      .then(() => toastr.success('Repository Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  pageEntities(data) {
    let selected = data.selected + 1;

    this.loadEntities(selected);
  }
  searchChange(event) {
    const search = event.target.value;

    this.setState({
      search: search
    });
    this.loadEntities(1, search);
  }
  propertiesButtonClick(event) {
     this.props.history.push(`/admin/repositories/${this.props.repository._id}/properties`);
  }
  render() {
    const emptyStateProps = {
      onEmptyStateButtonClick: this.redirectToAddDataSetItemPage
    };
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Inventories"
        />
        {!this.state.loading && this.state.entities.results.length > 0 && <SearchRepository
          search={this.state.search}
          searchPlaceholder="Search Inventory"
          searchButtonText="Add Inventory Item"
          onSearchChange={this.searchChange}
          onSearchButtonClick={this.redirectToAddDataSetItemPage}
        />}

        {!this.state.loading && <EntityList
          repository={this.props.repository}
          entities={this.state.entities.results}
          numberOfPages={this.state.entities.max_pages}
          handlePageClick={this.pageEntities}
          EmptyState={EmptyState}
          HeaderTemplate={InventoryItemListHeaderTemplate}
          ListItemTemplate={InventoryItemListItemTemplate}
          emptyStateProps={emptyStateProps}
          onDeleteButtonClick={this.deleteEntity}
          onAddButtonClick={this.redirectToAddDataSetItemPage}
          loading={this.state.loading}
        />}
      </div>
    );
  }
}

EntityPage.propTypes = {
  company: PropTypes.object.isRequired,
  repository: PropTypes.object.isRequired,
  emptyStateCopy: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  repositoryActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let repositories = _.sortBy(state.auth.inventories, "name");

  let repository = {};
  const foundRepository = _.find(repositories, { _id: ownProps.match.params.repository_id });
  if(foundRepository) {
    repository = foundRepository;
  }

  let emptyStateCopy;
  switch(repository.entity_type) {
    case "Abstract":
      emptyStateCopy = AbstractFactory.emptyStateCopy();

      break;
    case "Calculator":
      emptyStateCopy = CalculatorFactory.emptyStateCopy();

      break;
    case "Product":
      emptyStateCopy = ProductFactory.emptyStateCopy();

      break;
    case "Protocol":
      emptyStateCopy = ProtocolFactory.emptyStateCopy();

      break;
    case "Recipe":
      emptyStateCopy = RecipeFactory.emptyStateCopy();

      break;
    case "Video":
      emptyStateCopy = VideoFactory.emptyStateCopy();

      break;
    default:
      emptyStateCopy = KnowledgeBaseFactory.emptyStateCopy();
  }
  let properties = [];
  if(repository && repository.attributes && repository.attributes.properties) {
    properties = _.sortBy(repository.attributes.properties, "name");
  }
  return {
    company: state.auth.company,
    repository: repository,
    emptyStateCopy: emptyStateCopy
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(entityActions, dispatch),
    repositoryActions: bindActionCreators(repositoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityPage);
