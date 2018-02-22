import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as entityActions from '../../../actions/entityActions';
import * as speechActions from '../../../actions/applications/speechActions';
//import * as entityTypes from '../../../../../app/models/types/entityTypes';
import DashboardHeader from '../../common/DashboardHeader';
import SetupHeader from '../../common/SetupHeader';
import Filters from '../../common/repositories/Filters';
import toastr from 'toastr';
import _ from 'lodash';
import Modal from 'boron/DropModal';

import entitiesApi from '../../../../api/companies/entityApi';

import AbstractForm from './Forms/AbstractForm';
import CalculatorForm from './Forms/CalculatorForm';
import EntityForm from './Forms/EntityForm';
import ProductForm from './Forms/ProductForm';
import ProtocolForm from './Forms/ProtocolForm';
import RecipeForm from './Forms/RecipeForm';
import VideoForm from './Forms/VideoForm';

import AbstractFactory from './Factories/AbstractFactory';
import CalculatorFactory from './Factories/CalculatorFactory';
import KnowledgeBaseFactory from './Factories/KnowledgeBaseFactory';
import ProductFactory from './Factories/ProductFactory';
import ProtocolFactory from './Factories/ProtocolFactory';
import RecipeFactory from './Factories/RecipeFactory';
import VideoFactory from './Factories/VideoFactory';

class ManageEntityPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      entity: this.props.entity,
      errors: {},
      loading: false,
      saving: false
    };
    this.onPreviewEntityProperty = this.previewEntityProperty.bind(this);
    this.onUpdateEntityAttributes = this.updateEntityAttributes.bind(this);
    this.onUpdateEntityState = this.updateEntityState.bind(this);
    this.saveEntity = this.saveEntity.bind(this);
    this.closeClicked = this.closeClicked.bind(this);
  }
  componentWillMount() {
    if(this.props.params.id) {
      this.setState({ loading: true });

      this.loadEntity(this.props.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.entity._id != nextProps.entity._id) {
      this.setState({entity: Object.assign({}, nextProps.entity)});
    }
  }
  deepCopyEntity(entity) {
    const newEntity = Object.assign({}, entity);

    switch(this.props.repository.name) {
      case "Abstracts":
        newEntity.attributes = Object.assign({}, AbstractFactory.deepCopyAttributes(entity.attributes));
        break;
      case "Calculators":
        newEntity.attributes = Object.assign({}, CalculatorFactory.deepCopyAttributes(entity.attributes));
        break;
      case "Products":
        newEntity.attributes = Object.assign({}, ProductFactory.deepCopyAttributes(entity.attributes));
        break;
      case "Protocols":
        newEntity.attributes = Object.assign({}, ProtocolFactory.deepCopyAttributes(entity.attributes));
        break;
      case "Recipes":
        newEntity.attributes = Object.assign({}, RecipeFactory.deepCopyAttributes(entity.attributes));
        break;
      case "Videos":
        newEntity.attributes = Object.assign({}, VideoFactory.deepCopyAttributes(entity.attributes));
        break;
      default:
        newEntity.attributes = Object.assign({}, KnowledgeBaseFactory.deepCopyAttributes(entity.attributes));
    }

    return newEntity;
  }
  updateEntityAttributes(event, attributes) {
    let entity = this.state.entity;
    entity.attributes = attributes;

    return this.setState({entity: this.deepCopyEntity(entity) });
  }
  previewEntityProperty(event, index, audioRef) {
    event.preventDefault();

    const entity = this.state.entity;
    const property = entity.properties[index];

    const entitySayAs = entity.say_as || entity.item_name;

    let textToConvert = `The ${property.key} of ${entitySayAs} is ${property.value}`;

    speechActions.convertTextToSpeech(this.props.company._id, this.props.repository._id, textToConvert)
    .then((audio) => {
      const uInt8Array = new Uint8Array(audio.data);
      const arrayBuffer = uInt8Array.buffer;
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);

      audioRef.audioEl.src = url;
      audioRef.audioEl.play();
    })
    .catch((err) => {
      toastr.error(err);
    });
  }
  updateEntityState(event) {
    const field = event.target.name;
    let entity = this.state.entity;
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    if(field == "synonyms") {
      const synonyms = [];
      _.each(value.split('\n'), (synonym) => {
        synonyms.push(synonym);
      });
      value = synonyms;
    }
    entity[field] = value;

    return this.setState({entity: entity});
  }
  loadEntity(entity_id) {
    entitiesApi.getEntity(this.props.company._id, this.props.repository._id, entity_id)
    .then(entity => {
      this.setState({
        loading: false,
        entity: this.deepCopyEntity(entity)
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  saveEntity(event) {
    event.preventDefault();
    this.setState({saving: true});

    this.props.actions.saveEntity(this.props.company._id, this.props.repository._id, this.state.entity)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Entity Saved');

    this.context.router.history.push(`/admin/repositories/entities`);
  }
  closeClicked(event) {
    event.preventDefault();

     this.props.history.push(`/admin/repositories/entities`);
  }
  render() {
    let dashboardTitle = "Add Knowledge Base Item";
    if(this.state.entity._id) {
      dashboardTitle = "Update Knowledge Base Item";
    }
    return (
      <div>
        <DashboardHeader
          dashboardTitle={this.props.repository.name}
        />
        {this.state.entity.type == "ABSTRACT" && <AbstractForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "CALCULATOR" && <CalculatorForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "KNOWLEDGEBASE" && <EntityForm
          entity={this.state.entity}
          entityProperties={this.props.entityProperties}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "LABMEMBER" && <EntityForm
          entity={this.state.entity}
          entityProperties={this.props.entityProperties}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "PRODUCT" && <ProductForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "PROTOCOL" && <ProtocolForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "RECIPE" && <RecipeForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "VIDEO" && <VideoForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
      </div>
    );
  }
}

ManageEntityPage.propTypes = {
  params: PropTypes.object,
  company: PropTypes.object.isRequired,
  repositories: PropTypes.array.isRequired,
  repository: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  entityProperties: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageEntityPage.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  let repositories = _.sortBy(state.auth.inventories, "name");

  let repository = {};
  const foundRepository = _.find(repositories, { _id: ownProps.match.params.repository_id });
  if(foundRepository) {
    repository = foundRepository;
  }

  const entityId =  ownProps.match.params.id;
  let entity;

  switch(repository.name) {
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
  }
  let properties = [];
  if(repository.attributes && repository.attributes.properties) {
    properties = _.sortBy(repository.attributes.properties, "name");
  }
  return {
    company: state.auth.company,
    entity: entity,
    repositories: repositories,
    repository: repository,
    entityProperties: properties
  };
}

function getEntityById(entities, id) {
  const entity = entities.filter(entity => entity._id == id);
  if (entity) return entity[0];
  return null;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(entityActions, dispatch),
    speechActions: bindActionCreators(speechActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageEntityPage);
