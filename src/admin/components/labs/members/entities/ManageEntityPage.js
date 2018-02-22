import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as entityActions from '../../../../actions/entityActions';
import * as speechActions from '../../../../actions/applications/speechActions';
import DashboardHeader from '../../../common/DashboardHeader';
import EntityList from './EntityList';
import Filters from '../../Filters';
import toastr from 'toastr';
import _ from 'lodash';
import Modal from 'boron/DropModal';

import LabMemberForm from './Forms/LabMemberForm';
import LabMemberFactory from './Factories/LabMemberFactory';

//import * as entityTypes from '../../../../../../app/models/types/entityTypes';

class ManageEntityPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      entity: Object.assign({}, this.deepCopyEntity(this.props.entity)),
      errors: {},
      saving: false
    };
    this.onPreviewEntityProperty = this.previewEntityProperty.bind(this);
    this.onUpdateEntityState = this.updateEntityState.bind(this);
    this.onUpdateEntityAttributesState = this.updateEntityAttributesState.bind(this);
    this.saveEntity = this.saveEntity.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.entity._id != nextProps.entity._id) {
      this.setState({entity: Object.assign({}, this.deepCopyEntity(nextProps.entity))});
    }
  }
  deepCopyEntity(entity) {
    const newEntity = Object.assign({}, entity);

    newEntity.attributes = Object.assign({}, LabMemberFactory.deepCopyAttributes(entity.attributes));

    return newEntity;
  }


  previewEntityProperty(event, index, audioRef) {
    event.preventDefault();

    const entity = this.state.entity;
    const property = entity.properties[index];

    const entitySayAs = entity.say_as || entity.item_name;

    let textToConvert = `The ${property.key} of ${entitySayAs} is ${property.value}`;

    speechActions.convertTextToSpeech(this.props.params.company_id, this.props.params.repository_id, textToConvert)
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
    entity.name = `${entity.first_name} ${entity.last_name}`;

    return this.setState({entity: entity});
  }
  updateEntityAttributesState(event, attributes) {
    let entity = this.state.entity;
    entity.attributes = attributes;

    entity.name = `${entity.attributes.first_name} ${entity.attributes.last_name}`;

    return this.setState({entity: this.deepCopyEntity(entity) });
  }
  saveEntity(event) {
    event.preventDefault();
    this.setState({saving: true});

    this.props.actions.saveEntity(this.props.params.company_id, this.props.params.repository_id, this.state.entity)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Entity Saved');

    this.context.router.history.push(`/admin/organizations/${this.props.params.company_id}/labs/${this.props.params.lab_id}/${this.props.params.type}/${this.props.params.repository_id}/entities`);
  }
  render() {
    let dashboardTitle = "Add Lab Member";
    if(this.state.entity._id) {
      dashboardTitle = "Update Lab Member";
    }
    return (
      <div>
        <Filters
          organizationId={this.props.params.company_id}
          lab={this.props.lab}
        />
        <DashboardHeader
          dashboardTitle={dashboardTitle} />
        {this.state.entity.type == "LABMEMBER" && <LabMemberForm
          entity={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.onUpdateEntityState}
          onChangeAttributes={this.onUpdateEntityAttributesState}
          onAudioPreviewClicked={this.onPreviewEntityProperty}
          onSave={this.saveEntity}
        />}
        <Modal ref="modal">
          <div>
            <h4>Test app in browser</h4>
          </div>
        </Modal>
      </div>
    );
  }
}

ManageEntityPage.propTypes = {
  params: PropTypes.object,
  dataSets: PropTypes.array.isRequired,
  dataSet: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  entityProperties: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired
};

ManageEntityPage.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  const lab = state.auth.lab;

  const repository = lab.lab_members;
  const repositories = [];
  repositories.push(repository);

  const entityId =  ownProps.match.params.id;
  let entity;

  switch(repository.name) {
    default:
      entity = LabMemberFactory.create();
  }
  if (entityId && state.entities.results.length > 0) {
    entity = getEntityById(state.entities.results, entityId);
  }
  let properties = [];
  if(repository.attributes && repository.attributes.properties) {
    properties = _.sortBy(repository.attributes.properties, "name");
  }
  return {
    lab: lab,
    entity: entity,
    dataSets: repositories,
    dataSet: repository,
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
