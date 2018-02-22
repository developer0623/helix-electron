import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import entitiesApi from '../../../../api/companies/entityApi';
import * as entityActions from '../../../actions/entityActions';
import * as repositoryActions from '../../../actions/companies/repositoryActions';
import SetupHeader from '../../common/SetupHeader';
import DashboardHeader from '../../common/DashboardHeader';
import SearchRepository from '../../common/SearchRepository';
import Filters from '../../common/repositories/Filters';
import EntityList from './EntityList';
import toastr from 'toastr';
import _ from 'lodash';
import EmptyState from './EmptyStateTemplates/RepositoryEmptyState';
import ListHeaderTemplate from './ListTemplates/EntityListHeaderTemplate';
import ListItemTemplate from './ListTemplates/EntityListItemTemplate';
import {
  OrdersItemListHeaderTemplate,
  ProtocolListHeaderTemplate,
  RecipeListHeaderTemplate,
  VideoListHeaderTemplate } from './ListTemplates/HeaderTemplates';
import {
  OrdersItemListItemTemplate,
  ProtocolListItemTemplate,
  RecipeListItemTemplate,
  VideoListItemTemplate } from './ListTemplates/ItemTemplates';

import AbstractFactory from './Factories/AbstractFactory';
import CalculatorFactory from './Factories/CalculatorFactory';
import KnowledgeBaseFactory from './Factories/KnowledgeBaseFactory';
import ProductFactory from './Factories/ProductFactory';
import ProtocolFactory from './Factories/ProtocolFactory';
import RecipeFactory from './Factories/RecipeFactory';
import VideoFactory from './Factories/VideoFactory';
import UploadFilePopup from '../UploadFilePopup';


import uuidv1 from 'uuid/v1';
import XLSX from 'xlsx';

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
      loading: false,
      modalFlag: false,
      fileName: '',
      uploadedEntities: null
    };
    this.redirectToAddDataSetPage = this.redirectToAddDataSetPage.bind(this);
    this.redirectToRepositoryItemPage = this.redirectToRepositoryItemPage.bind(this);
    this.redirectToManageDataSetPage = this.redirectToManageDataSetPage.bind(this);
    this.onDeleteRepositoryClick = this.onDeleteRepositoryClick.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.pageEntities = this.pageEntities.bind(this);
    this.deleteEntity = this.deleteEntity.bind(this);
    this.onPropertiesButtonClick = this.propertiesButtonClick.bind(this);
    this.setHeaderTemplate = this.setHeaderTemplate.bind(this);
    this.setListItemHeader = this.setListItemHeader.bind(this);
    this.openUploadModal = this.openUploadModal.bind(this);
    this.onReporityFileChange = this.reporityFileChange.bind(this);
    this.onUploadReporityClick = this.uploadEntities.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }
  componentWillMount() {
    this.setState({
      entities: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    });
    //this.setState({ loading: true });
    this.loadEntities();
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.repository._id != nextProps.repository._id) {
      this.setState({
        repository: nextProps.repository,
        entities: {
          results: [],
          current_page: 0,
          max_pages: 0
        }
      }, () => {
        this.loadEntities();
      });
    }
  }

  openUploadModal() {
    this.setState({modalFlag: true});
  }

  closePopup() {
    this.setState({modalFlag: false});
  }


  makeEntities(data) {
    let entity;
    let entities = [];
    switch(this.props.repository.name) {
      case "Abstracts":
        entity = AbstractFactory.create();
        break;
      case "Calculators":
        entity = CalculatorFactory.create();
        break;
      case "Products":
        entity = ProductFactory.create();
        break;
      case "Protocols":
        entity = ProtocolFactory.create();
        break;
      case "Recipes":
        entity = RecipeFactory.create();
        break;
      case "Videos":
        entity = VideoFactory.create();
        break;
      default:
        entity = KnowledgeBaseFactory.create();
        break;
    }
    let keys = data[0];
    for(let i=1; i<data.length; i++) {
      let newEntity = _.cloneDeep(entity);
      let item = data[i];
      let countOfAttributes = 0;
      let keyVal = '';
      keys.map((key, index)=> {
        let keylow = key.toLowerCase();
        if(item[index]) {
          switch(keylow) {
            case 'tags':
              newEntity.tags = item[index].split(',');
              break;
            case 'synonyms':
              newEntity.synonyms = item[index].split(',');
              break;
            case 'subtitle':
              newEntity.attributes.sub_title = item[index];
              break;
            case 'url':
              newEntity.attributes.url = item[index];
              break;
            case 'title':case 'name':
              newEntity.name = item[index];
              break;
            case 'say as':
              newEntity.say_as = item[index];
              break;
            case 'display as':
              newEntity.display_as = item[index];
              break;
            case 'description':
              newEntity.attributes.description = item[index];
              break;
            case 'instructions':
              newEntity.attributes.instructions = item[index];
              break;
            default:
              if(keylow.indexOf('ingredient')> -1) {
                let ingredient = {
                  name: '',
                  say_as: '',
                  display_as: ''
                };
                ingredient.name = item[index];
                if(countOfAttributes) {
                  newEntity.attributes.ingredients.push(ingredient);
                } else {
                  newEntity.attributes.ingredients[0] = ingredient;
                }
                countOfAttributes ++;
              } else if(keylow.indexOf('step')> -1) {
                let step = {
                  name: '',
                  say_as: '',
                  display_as: '',
                  can_remind: false,
                  reminder_minutes: '',
                  reminder_copy: '',
                  step_type: 'Action'
                };
                step.name = item[index];
                if(countOfAttributes) {
                  newEntity.attributes.steps.push(step);
                } else {
                  newEntity.attributes.steps[0] = step;
                }
                countOfAttributes ++;
              } else if(keylow.indexOf('key')> -1) { // knowledge base key
                let newProperty = {};
                keyVal = item[index];
                newProperty[keyVal] = '';
                newEntity.attributes.properties.push(newProperty);
              } else if(keylow.indexOf('value')> -1) { // knowledge base value
                newEntity.attributes.properties[countOfAttributes][keyVal] = item[index];
                countOfAttributes ++;
              }
              break;
          }
        }

      });

      entities.push(newEntity);
    }

    this.setState({uploadedEntities: entities});
  }




  reporityFileChange(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {type:'binary'});
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {header:1});
      this.makeEntities(data);
    };
    reader.readAsBinaryString(file);

  }
  uploadEntities(event) {
    event.preventDefault();
    this.setState({modalFlag: false});
    this.props.repositoryActions.uploadEntities(this.props.company._id, this.state.repository._id, this.state.uploadedEntities)
    .then(() => {
      toastr.success('Uploaded');
      this.loadEntities();
    })
    .catch(error => {
      toastr.error(error);
    });
  }
  redirectToRepositoryItemPage() {
    this.props.history.push(`/admin/repositories/${this.state.repository._id}/entities/new`);
  }
  redirectToAddDataSetPage() {
    this.props.history.push(`/admin/repositories/new`);
  }
  redirectToManageDataSetPage() {
    this.props.history.push(`/admin/repositories}`);
  }
  loadEntities(page, search) {
    this.setState({
      loading: true
    });
    entitiesApi.getAllEntities(this.props.company._id, this.state.repository._id, null, page, search)
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
      .then(() => {
        toastr.success('Entity Deleted');

        this.setState({search: ''});
        this.loadEntities();
      })
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
  setHeaderTemplate() {
    switch(this.props.repository.entity_type) {
      case "ORDERITEM":
        return OrdersItemListHeaderTemplate;
      case "PROTOCOL":
      case "Protocol":
        return ProtocolListHeaderTemplate;
      case "RECIPE":
      case "Recipe":
        return RecipeListHeaderTemplate;
      case "VIDEO":
        return VideoListHeaderTemplate;
      default:
        return ListHeaderTemplate;
    }
  }
  setListItemHeader() {
    switch(this.props.repository.entity_type) {
      case "ORDERITEM":
        return OrdersItemListItemTemplate;
      case "PROTOCOL":
      case "Protocol":
        return ProtocolListItemTemplate;
      case "RECIPE":
      case "Recipe":
        return RecipeListItemTemplate;
      case "VIDEO":
        return VideoListItemTemplate;
      default:
        return ListItemTemplate;
    }
  }
  render() {
    const emptyStateProps = {
      onEmptyStateButtonClick: this.redirectToRepositoryItemPage
    };
    return (
      <div>
        <div className="btn-toolbar mt-4">
          <div className="flextable-item flextable-primary">
            <div className="dashhead">
              <div className="dashhead-titles">
                <h6 className="dashhead-subtitle">Dashboards</h6>
                <h2 className="dashhead-title">{this.props.dashboardTitle}</h2>
              </div>
              <button id="inventoriesAddButton" type="button" className="btn create-btn">
                <Link to={`/admin/repositories/${this.props.repository._id}/properties`} className="add-item">
                  <i className="icons icon-pencil add-item"></i>&nbsp;
                  Edit Repository
                </Link>
              </button>
            </div>
          </div>
        </div>
        {!this.state.loading && this.state.entities.results.length > 0 && <SearchRepository
          search={this.state.search}
          searchPlaceholder={`Search ${this.props.repository.name}`}
          searchButtonText="Add Item"
          onSearchChange={this.searchChange}
          onSearchButtonClick={this.redirectToRepositoryItemPage}
          onOpenModalButtonClick={this.openUploadModal}
        />}

        {!this.state.loading && <EntityList
          repository={this.props.repository}
          entities={this.state.entities.results}
          numberOfPages={this.state.entities.max_pages}
          handlePageClick={this.pageEntities}
          onDeleteButtonClick={this.deleteEntity}
          loading={this.state.loading}
          EmptyState={EmptyState}
          emptyStateProps={emptyStateProps}
          HeaderTemplate={this.setHeaderTemplate()}
          ListItemTemplate={this.setListItemHeader()}
        />}
        {this.state.modalFlag && <UploadFilePopup
          fileName={this.state.fileName}
          onFileChange={this.onReporityFileChange}
          onCancel={this.closePopup}
          onUploadButtonClick={this.onUploadReporityClick}
        />
        }
      </div>
    );
  }
}

EntityPage.propTypes = {
  dashboardTitle: PropTypes.string.isRequired,
  company: PropTypes.object.isRequired,
  repository: PropTypes.object.isRequired,
  emptyStateCopy: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  repositoryActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let repositories = _.sortBy(state.auth.repositories, "name");
  let dashboardTitle = "";

  let repository = {};
  const foundRepository = _.find(repositories, { _id: ownProps.match.params.repository_id });
  if(foundRepository) {
    repository = foundRepository;
    dashboardTitle = repository.name;
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
    dashboardTitle: dashboardTitle,
    company: state.auth.company,
    repository: repository,
    emptyStateCopy: emptyStateCopy,
    user: state.auth.currentUser
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(entityActions, dispatch),
    repositoryActions: bindActionCreators(repositoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityPage);
