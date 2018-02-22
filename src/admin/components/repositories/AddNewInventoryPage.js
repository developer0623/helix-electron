import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DashboardHeader from '../common/DashboardHeader';
import repositoryApi from '../../../api/labs/repositoryApi';
import toastr from 'toastr';
import _ from 'lodash';

import * as inventoryActions from '../../actions/labs/inventoryActions';

import InventoryFlow from './Flows/InventoryFlow';

const totalNumberOfSteps = 4;

class AddNewInventoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      repository: this.props.repository,
      inventory: null,
      inventoryFileName: '',
      currentStep: 1,
      errors: {},
      saving: false
    };
    this.updateRepositoryState = this.updateRepositoryState.bind(this);
    this.saveRepository = this.saveRepository.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onPreviousClick = this.previousClicked.bind(this);
    this.onNextClick = this.nextClicked.bind(this);
    this.onInventoryFileChange = this.inventoryFileChange.bind(this);
    this.onUploadInventoryClick = this.uploadInventory.bind(this);
  }
  nextClicked(event) {
    event.preventDefault();

    if(this.state.currentStep > totalNumberOfSteps - 1)
      return;

    this.setState({
      currentStep: this.state.currentStep + 1
    });
  }
  previousClicked(event) {
    event.preventDefault();

    if(this.state.currentStep == 0)
      return;

    this.setState({
      currentStep: this.state.currentStep - 1
    });
  }
  updateRepositoryState(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    let repository = this.state.repository;
    repository[field] = value;
    return this.setState({repository: repository});
  }
  saveRepository(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.inventoryActions.saveInventory(this.props.lab._id, this.state.repository)
      .then((savedRepository) => {
        this.setState({
          repository: savedRepository,
          currentStep: this.state.currentStep + 1
        });
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  onComplete(event) {
    event.preventDefault();

    this.context.router.history.push(`/admin/labs/inventories`);
  }
  inventoryFileChange(event) {
    event.preventDefault();

    const file = event.target.files[0];
    // if (file.name.indexOf('.xlsx') !== file.name.length - '.xlsx'.length) {
    //   alert('Incorrect format, file should end in .xlsx');
    // } else {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const inventory = reader.result;
        this.setState({
          inventory
        });
      };
      reader.readAsArrayBuffer(file);
      this.setState({
        inventoryFileName: file.name
      });
    //}
  }
  uploadInventory(event) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.inventoryActions.uploadInventory(this.props.lab._id, this.state.repository._id, this.state.inventory)
    .then(() => {
      toastr.success('Inventory Uploaded');

      this.setState({
        saving: false,
        currentStep: this.state.currentStep + 1
      });
    })
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }
  render() {
    const dashboardTitle= "Inventories";

    return (
      <div>
        <DashboardHeader
          dashboardTitle={dashboardTitle} />
        <InventoryFlow
          currentStep={this.state.currentStep}
          repository={this.state.repository}
          onChange={this.updateRepositoryState}
          onNextClick={this.onNextClick}
          onPreviousClick={this.onPreviousClick}
          onSave={this.saveRepository}
          onComplete={this.onComplete}
          onInventoryFileChange={this.onInventoryFileChange}
          onUploadInventoryClick={this.onUploadInventoryClick}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

AddNewInventoryPage.propTypes = {
  company: PropTypes.object.isRequired,
  repository: PropTypes.object.isRequired,
  repository_types: PropTypes.array.isRequired,
  lab: PropTypes.object.isRequired,
  inventoryActions: PropTypes.object.isRequired
};

AddNewInventoryPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const repository = {
    name: ''
  };
  let repositories;
  let repositoryType;

  if(state.auth.currentUser.user_type == "Organization") {
    repositoryType = _.find(state.repositoryTypes, { type_name: "Inventory" });
    repository.repository_type = repositoryType;
    repositories = state.auth.inventories;
  } else {
    repositoryType = _.find(state.repositoryTypes, { type_name: "Inventory" });
    repository.repository_type = repositoryType;
    repositories = state.auth.lab.inventories;
  }
  return {
    company: state.auth.company,
    lab: state.auth.lab,
    repository: repository,
    repository_type: repositoryType,
    repository_types: _.sortBy(state.repositoryTypes, "type_name")
  };
}
function mapDispatchToProps(dispatch) {
  return {
    inventoryActions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewInventoryPage);
