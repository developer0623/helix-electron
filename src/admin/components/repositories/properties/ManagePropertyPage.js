import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as entityActions from '../../../actions/entityActions';
import * as speechActions from '../../../actions/applications/speechActions';
import DashboardHeader from '../../common/DashboardHeader';
import Filters from '../../common/repositories/Filters';
import toastr from 'toastr';
import _ from 'lodash';
import Modal from 'boron/DropModal';

import EntityPropertyForm from '../entities/Forms/EntityPropertyForm';

import EntityPropertyFactory from '../entities/Factories/EntityPropertyFactory';

class ManagePropertyPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      property: _.cloneDeep(this.props.property),
      errors: {},
      saving: false
    };
    this.onPreviewEntityProperty = this.previewEntityProperty.bind(this);
    this.onUpdatePropertyAttributes = this.updatePropertyAttributes.bind(this);
    this.onUpdatePropertyState = this.updatePropertyState.bind(this);
    this.onSaveProperty = this.saveProperty.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.property._id != nextProps.property._id) {
      this.setState({property: _.cloneDeep(nextProps.property)});
    }
  }
  updatePropertyAttributes(event, attributes) {
    let entity = this.state.entity;
    entity.attributes = attributes;

    return this.setState({entity: _.cloneDeep(entity) });
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
  updatePropertyState(event) {
    const field = event.target.name;
    let property = this.state.property;
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    if(field == "synonyms") {
      const synonyms = [];
      _.each(value.split('\n'), (synonym) => {
        synonyms.push(synonym);
      });
      value = synonyms;
    }
    property[field] = value;

    return this.setState({property: property});
  }
  saveProperty(event) {
    event.preventDefault();
    this.setState({saving: true});

    const repository = _.cloneDeep(this.props.repository);
    this.props.actions.saveEntityProperty(this.props.company._id, repository, this.state.property)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Property Saved');

    this.context.router.history.push(`/admin/repositories/${this.props.repository._id}`);
  }
  render() {
    let dashboardTitle = "Add Property";
    if(this.state.property._id) {
      dashboardTitle = "Update Property";
    }
    return (
      <div>
        <DashboardHeader
          dashboardTitle={dashboardTitle} />
        <EntityPropertyForm
          lookup_property={this.state.property}
          customSlotTypes={this.props.customSlotTypes}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdatePropertyState}
          onChangeEntityAttributes={this.onUpdateEntityAttributes}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.onSaveProperty}
        />
      </div>
    );
  }
}

ManagePropertyPage.propTypes = {
  company: PropTypes.object.isRequired,
  property: PropTypes.object.isRequired,
  repository: PropTypes.object.isRequired,
  customSlotTypes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

ManagePropertyPage.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  const propertyId =  ownProps.match.params.id;

  let property = EntityPropertyFactory.create();
  let repositories = _.sortBy(state.auth.repositories, "name");
  let dashboardTitle = "";

  let repository = {
    attributes: {}
  };
  let properties = [];

  const foundRepository = _.find(repositories, { _id: ownProps.match.params.repository_id });
  if(foundRepository) {
    repository = foundRepository;
    dashboardTitle = repository.name;
    if (propertyId && repository.attributes  && repository.attributes.properties.length > 0) {
      properties = _.sortBy(repository.attributes.properties, "name");

      property = getPropertyById(properties, propertyId);
    }
  }

  return {
    company: state.auth.company,
    property: property,
    repository: repository,
    customSlotTypes: state.allCustomSlotTypes
  };
}

function getPropertyById(properties, id) {
  const property = properties.filter(property => property._id == id);
  if (property) return property[0];
  return null;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(entityActions, dispatch),
    speechActions: bindActionCreators(speechActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePropertyPage);
