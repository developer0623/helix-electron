import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as entityActions from '../../../actions/entityActions';
import * as speechActions from '../../../actions/applications/speechActions';
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
import LabMemberForm from './Forms/LabMemberForm';
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
    this.onUpdateFieldValue = this.onUpdateFieldValue.bind(this);
    this.onChangeEntityProperty = this.onChangeEntityProperty.bind(this);
    this.onDeleteEntityProperty = this.onDeleteEntityProperty.bind(this);
    this.saveEntity = this.saveEntity.bind(this);
    this.closeClicked = this.closeClicked.bind(this);
  }
  componentWillMount() {
    if(this.props.match.params.id) {
      this.setState({ loading: true });

      this.loadEntity(this.props.match.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.entity._id != nextProps.entity._id) {
      this.setState({entity: _.cloneDeep(nextProps.entity)});
    }
  }
  // deepCopyEntity(entity) {
  //   const newEntity = Object.assign({}, entity);

  //   switch(this.props.repository.name) {
  //     case "Abstracts":
  //       newEntity.attributes = Object.assign({}, AbstractFactory.deepCopyAttributes(entity.attributes));
  //       break;
  //     case "Calculators":
  //       newEntity.attributes = Object.assign({}, CalculatorFactory.deepCopyAttributes(entity.attributes));
  //       break;
  //     case "Products":
  //       newEntity.attributes = Object.assign({}, ProductFactory.deepCopyAttributes(entity.attributes));
  //       break;
  //     case "Protocols":
  //       newEntity.attributes = Object.assign({}, ProtocolFactory.deepCopyAttributes(entity.attributes));
  //       break;
  //     case "Recipes":
  //       newEntity.attributes = Object.assign({}, RecipeFactory.deepCopyAttributes(entity.attributes));
  //       break;
  //     case "Videos":
  //       newEntity.attributes = Object.assign({}, VideoFactory.deepCopyAttributes(entity.attributes));
  //       break;
  //     default:
  //       newEntity.attributes = Object.assign({}, KnowledgeBaseFactory.deepCopyAttributes(entity.attributes));
  //   }

  //   return newEntity;
  // }
  updateEntityAttributes(event, attributes) {
    const field = event.target.name;
    let entity = this.state.entity;
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    if(!entity.attributes) {
      entity.attributes = {};
    }
    entity.attributes[field] = value;

    return this.setState({entity: _.cloneDeep(entity) });
  }
  previewEntityProperty(event, textToConvert, audioRef) {
    event.preventDefault();

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
  onUpdateFieldValue(field, value) {
    const entity = this.state.entity;

    entity[field] = value;

    return this.setState({entity: entity});
  }
  onChangeEntityProperty(event) {
    event.preventDefault();
  }
  onDeleteEntityProperty(event) {
    event.preventDefault();
  }
  loadEntity(entity_id) {
    entitiesApi.getEntity(this.props.company._id, this.props.repository._id, entity_id)
    .then(entity => {
      this.setState({
        loading: false,
        entity: _.cloneDeep(entity)
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  validateForm() {
    let formIsValid = true;
    let errors = {};

    this.setState({errors: {}});

    const entity = this.state.entity;

    switch(this.props.repository.entity_type) {
      case "KnowledgeBase":
      case "KNOWLEDGEBASE": {
        const results = KnowledgeBaseFactory.validateForm(entity);
        formIsValid = results.formIsValid;
        errors = results.errors;

        break;
      }
      case "Recipe":
      case "RECIPE": {
        const results = RecipeFactory.validateForm(entity);
        formIsValid = results.formIsValid;
        errors = results.errors;

        break;
       }
       case "PROTOCOL": {
        const results = ProtocolFactory.validateForm(entity);
        formIsValid = results.formIsValid;
        errors = results.errors;

        break;
      }
      case "VIDEO": {
        const results = VideoFactory.validateForm(entity);
        formIsValid = results.formIsValid;
        errors = results.errors;

        break;
      }
    }
    this.setState({errors: errors});

    return formIsValid;
  }
  saveEntity(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }
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

    this.context.router.history.push(`/admin/repositories/${this.props.repository._id}/entities`);
  }
  closeClicked(event) {
    event.preventDefault();

     this.props.history.push(`/admin/repositories/entities`);
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle={this.props.dashboardTitle}
        />
        {this.state.entity.type == "ABSTRACT" && <AbstractForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onUpdateFieldValue={this.onUpdateFieldValue}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "CALCULATOR" && <CalculatorForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onUpdateFieldValue={this.onUpdateFieldValue}
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
          onUpdateFieldValue={this.onUpdateFieldValue}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onChangeEntityProperty={this.onChangeEntityProperty}
          onDeleteEntityProperty={this.onDeleteEntityProperty}
          onPreviewEntityProperty={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "LABMEMBER" && <LabMemberForm
          entity={this.state.entity}
          entityProperties={this.props.entityProperties}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onUpdateFieldValue={this.onUpdateFieldValue}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "PRODUCT" && <ProductForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onUpdateFieldValue={this.onUpdateFieldValue}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "PROTOCOL" && <ProtocolForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onUpdateFieldValue={this.onUpdateFieldValue}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "RECIPE" && <RecipeForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onUpdateFieldValue={this.onUpdateFieldValue}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        {this.state.entity.type == "VIDEO" && <VideoForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onUpdateFieldValue={this.onUpdateFieldValue}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
      </div>
    );
  }
}

ManageEntityPage.propTypes = {
  dashboardTitle: PropTypes.string.isRequired,
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
  let repositories = _.sortBy(state.auth.repositories, "name");
  let dashboardTitle = "";
  let repository = {};
  const foundRepository = _.find(repositories, { _id: ownProps.match.params.repository_id });
  if(foundRepository) {
    repository = foundRepository;
    dashboardTitle = repository.name;
  }

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
    dashboardTitle: dashboardTitle,
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
