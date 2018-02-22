import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as customSlotActions from '../../../actions/customSlotActions';
import DashboardHeader from '../../common/DashboardHeader';
import CustomSlotList from './CustomSlotList';
import CustomSlotForm from './CustomSlotForm';
import toastr from 'toastr';
import _ from 'lodash';

class ManageCustomSlotPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      custom_slot: Object.assign({}, this.props.custom_slot),
      errors: {},
      saving: false
    };
    this.updateCustomSlotState = this.updateCustomSlotState.bind(this);
    this.saveCustomSlot = this.saveCustomSlot.bind(this);
    this.customSlotTypes = _.map(this.props.customSlotTypes, (customSlotType) => {
      return {
        value: customSlotType,
        text: customSlotType
      };
    });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.custom_slot._id != nextProps.custom_slot._id) {
      this.setState({custom_slot: Object.assign({}, nextProps.custom_slot)});
    }
  }
  updateCustomSlotState(event) {
    const field = event.target.name;
    let value = event.target.value;

    if(field == "synonyms") {
      const synonyms = [];
      _.each(value.split('\n'), (synonym) => {
        synonyms.push(synonym);
      });
      value = synonyms;
    }
    let custom_slot = this.state.custom_slot;
    custom_slot[field] = value;
    return this.setState({custom_slot: custom_slot});
  }
  saveCustomSlot(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCustomSlot(this.props.params.application_id, this.state.custom_slot)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Custom Slot Saved');

     this.props.history.push(`/admin/applications/${this.props.params.application_id}/settings/custom_slots`);
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Custom Slots" />
        <CustomSlotForm
          customSlot={this.state.custom_slot}
          customSlotTypes={this.props.customSlotTypes}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateCustomSlotState}
          onSave={this.saveCustomSlot}
        />
      </div>
    );
  }
}

ManageCustomSlotPage.propTypes = {
  custom_slot: PropTypes.object.isRequired,
  customSlotTypes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  params: PropTypes.array.isRequired
};

ManageCustomSlotPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const customSlotId =  ownProps.match.params.id;
  let custom_slot = {
    name: '',
    custom_slot_value: '',
    custom_slot_type: ''
  };
  if (customSlotId && state.customSlots.results.length > 0) {
    custom_slot = getCustomSlotById(state.customSlots.results, customSlotId);
  }
  return {
    custom_slot,
    customSlotTypes: state.allCustomSlotTypes
  };
}

function getCustomSlotById(custom_slots, id) {
  const custom_slot = custom_slots.filter(custom_slot => custom_slot._id == id);
  if (custom_slot) return custom_slot[0];
  return null;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(customSlotActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomSlotPage);
