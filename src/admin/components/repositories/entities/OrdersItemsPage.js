import React, {PropTypes}  from 'react';
import ReactDOM from 'react-dom';
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
import EmptyState from './EmptyStateTemplates/OrderItemsEmptyState';
import EntityListItemTemplate from './ListTemplates/EntityListItemTemplate';
import ListHeaderTemplate from './ListTemplates/HeaderTemplates/OrdersItemListHeaderTemplate';
import ListItemTemplate from './ListTemplates/ItemTemplates/OrdersItemListItemTemplate';

import toastr from 'toastr';
import xlsx from 'xlsx';
import _ from 'lodash';
import { default as ExcelFile, ExcelSheet, ExcelColumn } from "react-data-export";
import LoadingSpinner from '../../common/LoadingSpinner';



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
      exportNeed: false,
      repository: this.props.repository,
      entities: {
        results: []
      },
      loading: false
    };
    this.pageEntities = this.pageEntities.bind(this);
    this.deleteEntity = this.deleteEntity.bind(this);
    this.exportToJSON = this.exportToJSON.bind(this);
    this.excel = this.excel.bind(this);
    this.renderButtonsRow = this.renderButtonsRow.bind(this);
    this.archiveThisOrder = this.archiveThisOrder.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });
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
        },
        loading: true
      }, () => {
        this.loadEntities();
      });
    }
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
  exportToJSON() {
    this.setState({ exportNeed: true });
  }

  excel() {

    setTimeout(() => {
      this.deleteDownloadButton();
    }, 50);

    return (

      <ExcelFile filename="my-orders.xlsx">
        <ExcelSheet data={this.state.entities.results} name="Orders">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Created At" value="createdAt" />
        </ExcelSheet>
      </ExcelFile>
    );



  }

  deleteDownloadButton() {
    let aTags = document.getElementsByTagName("button");
    let searchText = "Download";
    let found;

    for (let i = 0; i < aTags.length; i++) {
      if (aTags[i].textContent == searchText) {
        found = aTags[i];
        break;
      }
    }

    if(found) {
      found.click();
      found.remove();
    }

  }

  archiveThisOrder() {
    this.setState({saving: true});

    const repository = Object.assign({}, this.props.repository, { isArchived: true });
    repository.isArchived = true;
    this.props.repositoryActions.saveRepository(this.props.company._id, repository)
      .then(() => toastr.success('Repository Archived'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  renderButtonsRow() {
    return (
      <div className="row" style={{ marginLeft: '0px' }}>
        <button type="button" style={{ cursor: 'pointer', marginRight: '30px' }} className="btn btn-default btn-pill btn-primary" onClick={this.exportToJSON}>Export</button>
        {this.props.repository.isArchived === false ?
          <button type="button" style={{ cursor: 'pointer', marginRight: '30px' }} className="btn btn-default btn-pill btn-primary" onClick={this.archiveThisOrder}>
            Archive
          </button>
          : null }
      </div>
    );
  }

  render() {
    const emptyStateProps = {};
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Ordering"
        />
        {this.props.repository._id ?
          <EntityList
            repository={this.props.repository}
            entities={this.state.entities.results}
            numberOfPages={this.state.entities.max_pages}
            handlePageClick={this.pageEntities}
            onDeleteButtonClick={this.deleteEntity}
            loading={this.state.loading}
            EmptyState={EmptyState}
            emptyStateProps={emptyStateProps}
            HeaderTemplate={ListHeaderTemplate}
            ListItemTemplate={ListItemTemplate}
          /> : <LoadingSpinner />
        }
        {this.state.entities.results.length > 0 ?
          this.renderButtonsRow() : null
        }
        {this.state.exportNeed && this.excel()}
      </div>
    );
  }
}

EntityPage.propTypes = {
  company: PropTypes.object.isRequired,
  repository: PropTypes.object.isRequired,
  emptyStateCopy: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  repositoryActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let repositories = _.sortBy(state.auth.companyOrders, "name");

  let repository = {};
  const foundRepository = _.find(repositories, { _id: ownProps.match.params.repository_id });
  if(foundRepository) {
    repository = foundRepository;
  }
  const emptyStateCopy = KnowledgeBaseFactory.emptyStateCopy();
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
