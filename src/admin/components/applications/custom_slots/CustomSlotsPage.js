import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as customSlotActions from '../../../actions/customSlotActions';
import DashboardHeader from '../../common/DashboardHeaderWithAdd';
import Filters from '../AdvancedFilters';
import CustomSlotList from './CustomSlotList';
import CustomSlotsEmptyStatus from './CustomSlotsEmptyState';
import toastr from 'toastr';

class CustomSlotPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: ''
    };
    this.redirectToAddCustomSlotPage = this.redirectToAddCustomSlotPage.bind(this);
    this.searchCustomSlots = this.searchCustomSlots.bind(this);
    this.pageCustomSlots = this.pageCustomSlots.bind(this);
    this.deleteCustomSlot = this.deleteCustomSlot.bind(this);
  }
  componentWillMount() {
    this.props.actions.loadCustomSlots(this.props.params.application_id);
  }
  redirectToAddCustomSlotPage() {
     this.props.history.push(`/admin/applications/${this.props.params.application_id}/settings/custom_slots/new`);
  }
  deleteCustomSlot(customSlot, event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteCustomSlot(this.props.params.application_id, customSlot)
      .then(() => toastr.success('Custom Slot Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  pageCustomSlots(data) {
    const name = this.state.search;
    const selected = data.selected + 1;

    this.props.actions.loadCustomSlots(this.props.params.application_id, selected, name);
  }
  searchCustomSlots(event) {
    const name = event.target.value;
    this.props.actions.loadCustomSlots(this.props.params.application_id, 1, name);

    this.setState({search: name});
  }
  render() {
    return (
      <div>
        <Filters
          company={this.props.company}
          lab={this.props.lab} />
        <DashboardHeader
          dashboardTitle="Vocabulary"
          addButtonText="Add Entity"
          onAddButtonClick={this.redirectToAddCustomSlotPage}
          search={this.state.search}
          searchPlaceholder="Search Vocabulary"
          onSearchButtonClick={this.searchCustomSlots} />
        <CustomSlotList
          applicationId={this.props.params.application_id}
          custom_slots={this.props.custom_slots}
          numberOfPages={this.props.numberOfPages}
          handlePageClick={this.pageCustomSlots}
          onDeleteButtonClick={this.deleteCustomSlot}
        />
      </div>
    );
  }
}

CustomSlotPage.propTypes = {
  params: PropTypes.object,
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  custom_slots: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    lab: state.auth.lab,
    application: state.auth.lab.application,
    custom_slots: state.customSlots.results,
    currentPage: state.customSlots.current_page,
    numberOfPages: state.customSlots.max_pages
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(customSlotActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSlotPage);
