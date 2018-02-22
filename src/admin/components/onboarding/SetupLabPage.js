import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../common/DashboardHeader';
import * as labActions from '../../actions/companies/labActions';
import toastr from 'toastr';
import _ from 'lodash';

import LabForm from '../labs/LabForm';

class SetupLabPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lab: Object.assign({}, this.deepCopy(props.lab)),
      address: {},
      contact: {},
      errors: {
        contact: {},
        laboratory_address: {}
      },
      saving: false
    };
    this.updateLabState = this.updateLabState.bind(this);
    this.addKeyword = this.addKeyword.bind(this);
    this.removeKeyword = this.removeKeyword.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.saveLab = this.saveLab.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.lab._id != nextProps.lab._id) {
      this.setState=({lab :Object.assign({}, this.deepCopy(nextProps.lab))});
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
  validateForm() {
    const errors = {
      contact: {},
      laboratory_address: {}
    };
		let formIsValid = true;
    this.setState=({errors: {contact: {},laboratory_address: {}}});
    const lab = this.state.lab;

		if (lab.lab_name.length < 3) {
			errors.lab_name = 'Lab Name is required and must be at least 3 characters.';
			formIsValid = false;
		}
    if(lab.description.length == 0) {
      errors.description = 'Please provide a short description of this lab space';
      formIsValid = false;
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
    .then(() => this.redirect())
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }
  redirect() {
    this.setState({saving: false});

    toastr.success('Lab Saved');

    this.context.router.history.push(`/admin/onboard`);
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
          dashboardTitle="Lab Setup"
        />
        <LabForm
          lab={this.state.lab}
          address={this.state.address}
          contact={this.state.contact}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateLabState}
          onSave={this.saveLab}
        />
      </div>
    );
  }
}

SetupLabPage.propTypes = {
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};
SetupLabPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const labId = ownProps.match.params.id;

  let lab = {
    keywords: []
  };

  const foundRepository = _.find(state.auth.labs, { _id: labId });
  if(foundRepository) {
    lab = foundRepository;
  }
  return {
    company: state.auth.company,
    lab: lab,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(labActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupLabPage);
