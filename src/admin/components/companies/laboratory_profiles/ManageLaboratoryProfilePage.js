import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as companyActions from '../../../actions/companyActions';
import laboratoryProfileApi from '../../../../api/companies/laboratoryProfileApi';
import DashboardHeader from '../../common/DashboardHeader';
import LaboratoryProfileForm from './LaboratoryProfileForm';
import toastr from 'toastr';
import _ from 'lodash';
import LoadingSpinner from '../../common/LoadingSpinner';

class ManageLaboratoryProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      laboratory_profile: Object.assign({}, this.props.laboratory_profile),
      errors: {},
      saving: false
    };
    this.updateLaboratoryProfile = this.updateLaboratoryProfile.bind(this);
    this.saveLaboratoryProfile = this.saveLaboratoryProfile.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.laboratory_profile._id != nextProps.laboratory_profile._id) {
      this.setState({
        laboratory_profile: nextProps.laboratory_profile
      });
    }
  }
  updateLaboratoryProfile(event) {
    const field = event.target.name;

    let laboratory_profile = this.state.laboratory_profile;
    laboratory_profile[field] = event.target.value;
    return this.setState({laboratory_profile: laboratory_profile});
  }
  validateForm() {
    const errors = {};
		let formIsValid = true;

    this.setState({errors: errors});
		const laboratory_profile = this.state.laboratory_profile;

		this.setState({errors: errors});
		return formIsValid;
	}
  saveLaboratoryProfile(event) {
    event.preventDefault();

    if (!this.validateForm()) {
			return;
		}
    this.setState({saving: true});

    this.props.actions.saveLaboratoryProfile(this.props.company._id, this.state.laboratory_profile)
      .then(() => {
        this.setState({saving: false});

        toastr.success('Laboratory Profile Changes Saved');

        this.context.router.push(`/admin/organization/laboratory_profiles`);
      })
      .catch(error => {
        toastr.error(error);

        this.setState({saving: false});
      });
  }
  render() {
    const dashboardTitle = (this.props.params.laboratory_profile_id) ? "Edit Laboratory Profile" : "Add Laboratory Profile";

    return (
      <div>
        <DashboardHeader
          dashboardTitle={dashboardTitle} />
        {!this.props.loading
          ?
            <LaboratoryProfileForm
              laboratory_profile={this.state.laboratory_profile}
              errors={this.state.errors}
              saving={this.state.saving}
              onChange={this.updateLaboratoryProfile}
              onSave={this.saveLaboratoryProfile}
            />
          : <LoadingSpinner />
        }
      </div>
    );
  }
}

ManageLaboratoryProfilePage.propTypes = {
  company: PropTypes.object.isRequired,
  laboratory_profile: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageLaboratoryProfilePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const laboratoryProfileId =  ownProps.match.params.laboratory_profile_id;
  let laboratory_profile = {
    profile_name: "",
    street_address_1: "",
    street_address_2: "",
    city: "",
    state: "",
    zip_code: ""
  };
  let loading = (laboratoryProfileId) ? true : false;
  if (laboratoryProfileId && state.laboratoryProfiles.length > 0) {
    laboratory_profile = getLaboratoryProfileById(state.laboratoryProfiles, laboratoryProfileId);
    loading = false;
  }
  return {
    company: state.auth.company,
    laboratory_profile: laboratory_profile,
    loading: loading
  };
}
function getLaboratoryProfileById(laboratoryProfiles, id) {
  const laboratoryProfile = laboratoryProfiles.filter(laboratoryProfile => laboratoryProfile._id == id);

  if (laboratoryProfile) {
    return laboratoryProfile[0];
  }
  return null;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(companyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLaboratoryProfilePage);
