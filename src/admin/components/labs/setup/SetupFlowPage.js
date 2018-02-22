import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../../common/DashboardHeader';
import SetupHeader from '../../common/SetupHeader';
import Filters from '../Filters';
import * as labActions from '../../../actions/companies/labActions';
import labApi from '../../../../api/labs/labApi';
import toastr from 'toastr';
import _ from 'lodash';

import Step1Form from './forms/Step1Form';
import Step2Form from './forms/Step2Form';
import Step3Form from './forms/Step3Form';
import Step4Form from './forms/Step4Form';
import Step5Form from './forms/Step5Form';
import Step6Form from './forms/Step6Form';
import Step7Form from './forms/Step7Form';

class SetupFlowPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lab: Object.assign({}, this.deepCopy(props.lab)),
      currentStep: 1,
      errors: {},
      saving: false
    };
    this.updateLabState = this.updateLabState.bind(this);
    this.addKeyword = this.addKeyword.bind(this);
    this.removeKeyword = this.removeKeyword.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.saveLab = this.saveLab.bind(this);
    this.nextClicked = this.nextClicked.bind(this);
    this.previousClicked = this.previousClicked.bind(this);
    this.closeClicked = this.closeClicked.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.lab._id != nextProps.lab._id) {
      this.setState({lab : Object.assign({}, this.deepCopy(nextProps.lab))});
    }
  }
  updateLabState(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    let lab = this.state.lab;
    lab[field] = value;
    return this.setState({lab: lab});
  }
  addKeyword(event) {
    event.preventDefault();

    const keyword = this.state.keyword;
    const lab = this.state.lab;

    lab.keywords.push(keyword);

    return this.setState({
      lab: this.deepCopy(lab),
      keyword: ''
    });
  }
  removeKeyword(event, keyword) {
    event.preventDefault();

    let lab = this.state.lab;

    lab.keywords = _.pull(lab.keywords, keyword);

    return this.setState({lab: this.deepCopy(lab) });
  }
  changeKeyword(event) {
    event.preventDefault;

    const keyword = event.target.value;

    return this.setState({keyword: keyword });
  }
  saveLab(event) {
    event.preventDefault();

    this.setState({saving: true});

    labApi.saveLab(this.state.lab)
    .then(() => this.redirect())
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }
  previousClicked(event) {
    event.preventDefault();

    this.setState({
      currentStep: this.state.currentStep - 1
    });
  }
  nextClicked(event) {
    event.preventDefault();

    this.setState({
      currentStep: this.state.currentStep + 1
    });
  }
  closeClicked(event) {
    event.preventDefault();

     this.props.history.push(`/admin/labs/setup`);
  }
  redirect() {
    this.setState({saving: false});

    toastr.success('Lab Saved');

    this.context.router.history.push(`/admin/labs/${this.state.lab._id}/repositories`);
  }
  deepCopy(lab) {
    let newLab = Object.assign({}, lab);

    newLab.keywords = [];
    _.each(lab.keywords, (keyword) => {
      newLab.keywords.push(keyword);
    });

    return newLab;
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Setup Your Lab"
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
        {this.state.currentStep == 5 && <Step5Form
          lab={this.state.lab}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateLabState}
          onNext={this.nextClicked}
          onPrevious={this.previousClicked}
          onSave={this.saveLab}
        />}
        {this.state.currentStep == 6 && <Step6Form
          lab={this.state.lab}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateLabState}
          onNext={this.nextClicked}
          onPrevious={this.previousClicked}
          onSave={this.saveLab}
        />}
        {this.state.currentStep == 7 && <Step7Form
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

SetupFlowPage.propTypes = {
  lab: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};
SetupFlowPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const lab = {
    lab_name: '',
    lab_members: [],
    inventories: [],
    repositories: [],
    keywords:[]
  };
  return {
    lab: lab,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(labActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupFlowPage);
