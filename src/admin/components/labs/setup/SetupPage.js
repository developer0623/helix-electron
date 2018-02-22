import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../../common/DashboardHeader';
import SetupHeader from '../../common/SetupHeader';
import Filters from '../Filters';
import * as labActions from '../../../actions/companies/labActions';
import labApi from '../../../../api/companies/labApi';
import toastr from 'toastr';
import Step1Form from './forms/Step1Form';
import _ from 'lodash';

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
    this.onStartSetupFlowClicked = this.startSetupFlow.bind(this);
    this.closeClicked = this.closeClicked.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.lab._id != nextProps.lab._id) {
      this.setState({
        lab: Object.assign({}, this.deepCopy(nextProps.lab))
      });
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

    labApi.saveLab(this.props.params.company_id, this.state.lab)
    .then(() => this.redirect())
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }
  closeClicked(event) {
    event.preventDefault();

     this.props.history.push(`/admin/labs`);
  }
  startSetupFlow(event) {
    event.preventDefault();

     this.props.history.push(`/admin/labs/setup/new`);
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
        <div className="empty-state">
          <h5>To get started, setup your Lab.</h5>
          <button
            type="button"
            className="btn btn-pill btn-primary"
            onClick={this.onStartSetupFlowClicked}>
              Setup Your Lab
          </button>
          <h6></h6>
        </div>
      </div>
    );
  }
}

SetupFlowPage.propTypes = {
  lab: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    lab: state.auth.lab,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(labActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupFlowPage);
