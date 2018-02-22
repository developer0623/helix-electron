import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as companyActions from '../../../actions/companyActions';
import DashboardHeader from '../../common/DashboardHeader';
import SkillGroupForm from './SkillGroupForm';
import toastr from 'toastr';
import _ from 'lodash';
import LoadingSpinner from '../../common/LoadingSpinner';

class ManageSkillGroupPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      skill_group: Object.assign({}, this.props.skill_group),
      errors: {},
      saving: false
    };
    this.updateSkillGroup = this.updateSkillGroup.bind(this);
    this.saveSkillGroup = this.saveSkillGroup.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.skill_group._id != nextProps.skill_group._id) {
      this.setState({
        skill_group: nextProps.skill_group
      });
    }
  }
  updateSkillGroup(event) {
    const field = event.target.name;

    let skill_group = this.state.skill_group;
    skill_group[field] = event.target.value;
    return this.setState({skill_group: skill_group});
  }
  validateForm() {
    const errors = {};
		let formIsValid = true;

    this.setState({errors: errors});
		const skill_group = this.state.skill_group;

    if (_.isEmpty(skill_group.skill_group_name)) {
      errors.skill_group_name = 'Skill Group Name is required.';
      formIsValid = false;
    }
		this.setState({errors: errors});
		return formIsValid;
	}
  saveSkillGroup(event) {
    event.preventDefault();

    if (!this.validateForm()) {
			return;
		}
    this.setState({saving: true});

    this.props.actions.saveSkillGroup(this.props.company._id, this.state.skill_group)
      .then(() => {
        this.setState({saving: false});

        toastr.success('Skill Group Created');

        this.context.router.push(`/admin/organization/skill_groups`);
      })
      .catch(error => {
        toastr.error(error);

        this.setState({saving: false});
      });
  }
  render() {
    const dashboardTitle = (this.props.params.skill_group_id) ? "Edit Skill Group" : "Add Skill Group";

    return (
      <div>
        <DashboardHeader
          dashboardTitle={dashboardTitle}
        />
      {!this.props.loading ?
        <SkillGroupForm
          skill_group={this.state.skill_group}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateSkillGroup}
          onSave={this.saveSkillGroup}
          />
        : <LoadingSpinner />
      }
      </div>
    );
  }
}

ManageSkillGroupPage.propTypes = {
  company: PropTypes.object.isRequired,
  skill_group: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
function getSkillGroupById(skillGroups, id) {
  const skillGroup = skillGroups.filter(skillGroup => skillGroup._id == id);

  if (skillGroup) {
    return skillGroup[0];
  }
  return null;
}
ManageSkillGroupPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const skillGroupId =  ownProps.match.params.skill_group_id;
  let skill_group = {
    skill_group_name: "",
    street_address_1: "",
    street_address_2: "",
    city: "",
    state: "",
    zip_code: ""
  };
  let loading = (skillGroupId) ? true : false;
  if (skillGroupId && state.skillGroups.length > 0) {
    skill_group = getSkillGroupById(state.skillGroups, skillGroupId);
    loading = false;
  }
  return {
    company: state.auth.company,
    skill_group: skill_group,
    loading: loading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(companyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSkillGroupPage);
