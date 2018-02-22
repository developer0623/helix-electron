import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import customSlotTypesApi from '../../../../api/systems/customSlotTypesApi';
import DashboardHeader from '../../common/DashboardHeader';
import SearchRepository from '../../common/SearchRepository';
import LoadingDots from '../../common/LoadingDots';
import Filters from '../Filters';
import CustomSlotTypeList from './CustomSlotTypeList';
import toastr from 'toastr';

class CustomSlotTypesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      loading: false,
      customSlotTypes: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.redirectToAddCustomSlotTypePage = this.redirectToAddCustomSlotTypePage.bind(this);
    this.searchCustomSlotTypes = this.searchCustomSlotTypes.bind(this);
    this.pageCustomSlotTypes = this.pageCustomSlotTypes.bind(this);
    this.deleteCustomSlotType = this.deleteCustomSlotType.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });

    this.loadCustomSlotTypes();
  }
  redirectToAddCustomSlotTypePage() {
     this.props.history.push(`/admin/system/custom_slot_type`);
  }
  deleteCustomSlotType(customSlotType, event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteCustomSlotType(customSlotType)
      .then(() => toastr.success('Custom Slot Type Deleted'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  pageCustomSlotTypes(data) {
    let selected = data.selected + 1;

    this.loadCustomSlotTypes(selected);
  }
  searchCustomSlotTypes(event) {
    let name = event.target.value;
    this.loadCustomSlotTypes(1, name);

    this.setState({search: name});
  }
  loadCustomSlotTypes(page, custom_slot_type) {
    customSlotTypesApi.getCustomSlotTypesPaged(page, custom_slot_type).then(customSlotTypes => {
      this.setState({
        loading: false,
        customSlotTypes: customSlotTypes
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="Custom Slot Types"
        />
        <SearchRepository
          search={this.state.search}
          searchPlaceholder="Search Custom Slot Type"
          searchButtonText="Add Custom Slot Type"
          onSearchChange={this.searchCustomSlotTypes}
          onSearchButtonClick={this.redirectToAddCustomSlotTypePage}
        />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <CustomSlotTypeList
          customSlotTypes={this.state.customSlotTypes.results}
          numberOfPages={this.state.customSlotTypes.max_pages}
          handlePageClick={this.pageCustomSlotTypes}
          onDeleteButtonClick={this.deleteCustomSlotType}
        />}
      </div>
    );
  }
}

CustomSlotTypesPage.propTypes = {
actions: PropTypes.object.isRequired
};

CustomSlotTypesPage.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSlotTypesPage);
