import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as companyActions from '../../../actions/companyActions';
import DashboardHeader from '../../common/DashboardHeader';
import LoadingDots from '../../common/LoadingDots';
import LaboratoryProfileList from './LaboratoryProfileList';
import AddItemTemplate from './AddItemTemplate';
import toastr from 'toastr';
import LoadingSpinner from '../../common/LoadingSpinner';

class LaboratoryProfilesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      loading: false
    };
    this.redirectToAddLaboratoryProfilePage = this.redirectToAddLaboratoryProfilePage.bind(this);
    this.deleteLaboratoryProfile = this.deleteLaboratoryProfile.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.company._id != nextProps.company._id) {
      this.setState({
        company: nextProps.company
      });
    }
  }
  redirectToAddLaboratoryProfilePage() {
    this.props.history.push(`/admin/organization/laboratory_profiles/new`);
  }
  deleteLaboratoryProfile(laboratoryProfile, event) {
    event.preventDefault();
    this.setState({saving: true});

    this.props.actions.deleteLaboratoryProfile(this.props.company._id, laboratoryProfile)
    .then(() => {
      toastr.success('Laboratory Profile Deleted');
    })
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }

  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Laboratory Profiles"
          AddItemTemplate={AddItemTemplate}
          onButtonClick={this.redirectToAddLaboratoryProfilePage}
        />
      {this.props.laboratory_profiles.length
        ?
          <LaboratoryProfileList
            laboratory_profiles={this.props.laboratory_profiles}
            onDeleteButtonClick={this.deleteLaboratoryProfile}
          />
        : <LoadingSpinner />
      }
      {/*
      {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <LaboratoryProfileList
          laboratory_profiles={this.props.laboratory_profiles}
          onDeleteButtonClick={this.deleteLaboratoryProfile}
        />}
      */}
      </div>
    );
  }
}

LaboratoryProfilesPage.propTypes = {
  company: PropTypes.object.isRequired,
  laboratory_profiles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    laboratory_profiles: state.laboratoryProfiles
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(companyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LaboratoryProfilesPage);
