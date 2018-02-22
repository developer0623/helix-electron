import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as labActions from '../../../actions/companies/labActions';
import DashboardHeader from '../../common/DashboardHeader';
import SetupHeader from '../../common/SetupHeader';
import Filters from '../../common/repositories/Filters';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';
import toastr from 'toastr';
import _ from 'lodash';

const totalNumberOfSteps = 4;

class ManageInventoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lab: this.props.lab,
      currentStep: 1,
      errors: {},
      saving: false
    };
    this.updateLabState = this.updateLabState.bind(this);
    this.saveLab = this.saveLab.bind(this);
    this.nextClicked = this.nextClicked.bind(this);
    this.previousClicked = this.previousClicked.bind(this);
    this.onCloseCLicked = this.closeClicked.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.lab._id != nextProps.lab._id) {
      this.setState({lab: Object.assign({}, nextProps.lab)});
    }
  }
  updateLabState(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    let lab = this.state.lab;
    lab[field] = value;
    return this.setState({lab: lab});
  }
  validateForm() {
    const errors = {};
    let formIsValid = true;

    this.setState({errors: errors});
    
    const lab = this.state.lab;

    if(this.state.currentStep == 1) {
      if (lab.lab_name.length < 3) {
        errors.lab_name = 'Lab Name is required and must be at least 3 characters.';
        formIsValid = false;
      }
      if (_.isEmpty(lab.description)) {
        errors.description = 'A short description of the lab is required.';
        formIsValid = false;
      }
    }
    this.setState({errors: errors});
    return formIsValid;
  }
  saveLab(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }
    this.setState({saving: true});
    this.props.actions.saveLab(this.props.company._id, this.state.lab)
    .then(() => {
      this.redirect();
    })
    .catch((err) => {
      toastr.error(err);

      this.setState({saving: false});
    });
  }
  nextClicked(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }
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
  closeClicked(event) {
    event.preventDefault();

     this.props.history.push(`/admin/labs`);
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Lab Saved');
    this.context.router.history.push(`/admin/labs`);
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Setup a Lab"
        />
        {this.state.currentStep == 1 && <Step1Form
          lab={this.state.lab}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateLabState}
          onNext={this.nextClicked}
          onPrevious={this.previousClicked}
          onSave={this.saveLab}
        />}
        {this.state.currentStep == 2 && <Step2Form
          lab={this.state.lab}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateLabState}
          onNext={this.nextClicked}
          onPrevious={this.previousClicked}
          onSave={this.saveLab}
        />}
        {this.state.currentStep == 3 && <Step3Form
          lab={this.state.lab}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateLabState}
          onNext={this.nextClicked}
          onPrevious={this.previousClicked}
          onSave={this.saveLab}
        />}
        {this.state.currentStep == 4 && <Step4Form
          lab={this.state.lab}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateLabState}
          onNext={this.nextClicked}
          onPrevious={this.previousClicked}
          onSave={this.saveLab}
        />}
      </div>
    );
  }
}

ManageInventoryPage.propTypes = {
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageInventoryPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const company = state.auth.company;

  const labId =  ownProps.match.params.id;
  let lab = {
    lab_name: '',
    description: ''
  };
  if (labId && company.labs.length > 0) {
    lab = getLabById(company.labs, labId);
  }
  return {
    company: state.auth.company,
    lab: lab
  };
}
function getLabById(labs, id) {
  const lab = labs.filter(repository => repository._id == id);
  if (lab) return labs[0];
  return null;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(labActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInventoryPage);
