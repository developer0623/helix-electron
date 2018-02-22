import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as intentActions from '../../../actions/intentActions';
import DashboardHeader from '../../common/DashboardHeader';
import IntentForm from './IntentForm';
import toastr from 'toastr';

import _ from 'lodash';

class ManageIntentPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      intent: Object.assign({}, this.props.intent),
      errors: {},
      saving: false
    };
    this.updateIntentState = this.updateIntentState.bind(this);
    this.saveIntent = this.saveIntent.bind(this);
    this.appendIntentSlot = this.appendIntentSlot.bind(this);
    this.deleteIntentSlot = this.deleteIntentSlot.bind(this);
    this.updateIntentSlot = this.updateIntentSlot.bind(this);
    this.customSlotTypes = _.map(this.props.customSlotTypes, (customSlotType) => {
      return {
        value: customSlotType,
        text: customSlotType
      };
    });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.intent._id != nextProps.intent._id) {
      this.setState({intent: Object.assign({}, nextProps.intent)});
    }
  }
  updateIntentState(event) {
    const field = event.target.name;
    let value = event.target.value;

    if(field == "samples") {
      const samples = [];
      _.each(value.split('\n'), (sample) => {
        samples.push(sample);
      });
      value = samples;
    }
    let intent = this.state.intent;
    intent[field] = value;

    return this.setState({intent: this.deepCopy(intent) });
  }
  saveIntent(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveIntent(this.props.params.application_id, this.state.intent)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Intent Saved');
    this.context.router.history.push('/admin/applications/intents');
  }
  deepCopy(intent) {
    let newIntent = Object.assign({}, intent);

    newIntent.slots = [];
    _.each(intent.slots, (slot) => {
      const newSlot = Object.assign({}, slot);

      newSlot.prompts = [];
      _.each(slot.prompts, (prompt) => {
        newSlot.prompts.push(prompt);
      });
      newSlot.utterances = [];
      _.each(slot.utterances, (utterance) => {
        newSlot.utterances.push(utterance);
      });
      newIntent.slots.push(newSlot);
    });

    return newIntent;
  }
  appendIntentSlot(event) {
    event.preventDefault();
    let intent = this.state.intent;
    intent.slots.push({
      name: '',
      type: '',
      required: false,
      prompts: [],
      utterances: []
    });
    return this.setState({ intent: this.deepCopy(intent) });
  }
  deleteIntentSlot(rowIndex, event) {
    event.preventDefault();

    let intent = this.state.intent;
    intent.slots.splice(rowIndex, 1);
    return this.setState({ intent: this.deepCopy(intent) });
  }
  updateIntentSlot(event, index, field, value) {
    let intent = this.state.intent;
    intent.slots[index][field]= value;

    if(field == "prompts") {
      const prompts = [];
      _.each(value.split('\n'), (prompt) => {
        prompts.push(prompt);
      });
      value = prompts;
    }
    if(field == "utterances") {
      const utterances = [];
      _.each(value.split('\n'), (utterance) => {
        utterances.push(utterance);
      });
      value = utterances;
    }
    intent.slots[index][field]= value;

    return this.setState({intent: this.deepCopy(intent) });
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Intents" />
        <IntentForm
          intent={this.state.intent}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateIntentState}
          onSave={this.saveIntent}
          onAppendSlot={this.appendIntentSlot}
          onDeleteSlot={this.deleteIntentSlot}
          onChangeSlot={this.updateIntentSlot}
          customSlotTypes={this.customSlotTypes}
        />
      </div>
    );
  }
}

ManageIntentPage.propTypes = {
  params: PropTypes.object,
  intent: PropTypes.object.isRequired,
  customSlotTypes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageIntentPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const intentId =  ownProps.match.params.id;
  let intent = {
    name: '',
    type: '',
    slots: []
  };
  if (intentId && state.intents.results.length > 0) {
    intent = getIntentById(state.intents.results, intentId);
  }
  return {
    intent: intent,
    customSlotTypes: state.customSlotTypes
  };
}

function getIntentById(intents, id) {
  const intent = intents.filter(intent => intent._id == id);

  if (intent) {
    if(!intents.slots) {
      intent.slots = [];
    }

    return intent[0];
  }
  return null;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(intentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageIntentPage);
