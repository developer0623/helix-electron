import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import customSlotTypesApi from '../../../../api/systems/customSlotTypesApi';
import DashboardHeader from '../../common/DashboardHeader';
import LoadingDots from '../../common/LoadingDots';
import CustomSlotTypeForm from './CustomSlotTypeForm';
import Filters from '../Filters';
import toastr from 'toastr';
import _ from 'lodash';

class ManageCustomSlotTypePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      customSlotType: {},
      loading: false,
      intents: [],
      selectedIntent: 0,
      errors: {},
      saving: false
    };
    this.updateCustomSlotTypeState = this.updateCustomSlotTypeState.bind(this);
    this.saveCustomSlotType= this.saveCustomSlotType.bind(this);
  }
  componentWillMount() {
    if(this.props.params.id) {
      this.setState({ loading: true });

      customSlotTypesApi.getCustomSlotType(this.props.params.id)
      .then(customSlotType => {
        this.setState({
          loading: false,
          customSlotType: customSlotType
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.customSlotType._id != nextProps.customSlotType._id) {
      this.setState({customSlotType: Object.assign({}, nextProps.customSlotType)});
    }
  }
  updateCustomSlotTypeState(event) {
    const field = event.target.name;
    let fieldValue = event.target.value;

    if(field == "values") {
      const values = [];
      _.each(fieldValue.split('\n'), (value) => {
        values.push(value);
      });
      fieldValue = values;
    }

    let customSlotType = this.state.customSlotType;
    customSlotType[field] = fieldValue;
    return this.setState({customSlotType: customSlotType});
  }
  saveCustomSlotType(event) {
    event.preventDefault();
    this.setState({saving: true});

    customSlotTypesApi.saveCustomSlotType(this.state.customSlotType)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Custom Slot Type Saved');
    this.context.router.history.push('/admin/system/custom_slot_types');
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="Custom Slot Type" />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <CustomSlotTypeForm
          customSlotType={this.state.customSlotType}
          intents={this.state.intents}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateCustomSlotTypeState}
          onSave={this.saveCustomSlotType}
        />}
      </div>
    );
  }
}

ManageCustomSlotTypePage.propTypes = {
  params: PropTypes.object.isRequired,
  customSlotTypes: PropTypes.array.isRequired,
  customSlotType: PropTypes.object.isRequired
};

ManageCustomSlotTypePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return { };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomSlotTypePage);
