import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as companyActions from '../../../actions/companyActions';
import DashboardHeader from '../../common/DashboardHeader';
import LoadingDots from '../../common/LoadingDots';
import SkillGroupList from './SkillGroupList';
import AddItemTemplate from './AddItemTemplate';
import toastr from 'toastr';
import LoadingSpinner from '../../common/LoadingSpinner';

class SkillGroupsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
      loading: false
    };
    this.redirectToAddSkillGroupPage = this.redirectToAddSkillGroupPage.bind(this);
    this.deleteSkillGroup = this.deleteSkillGroup.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.company._id != nextProps.company._id) {
      this.setState({
        company: nextProps.company
      });
    }
  }
  redirectToAddSkillGroupPage() {
    this.props.history.push(`/admin/organization/skill_groups/new`);
  }
  deleteSkillGroup(user, event) {
    event.preventDefault();
    this.setState({saving: true});

    this.props.actions.deleteSkillGroup(this.props.company._id, user)
    .then(() => {
      toastr.success('Skill Group Deleted');
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
          dashboardTitle="Skill Groups"
          AddItemTemplate={AddItemTemplate}
          onButtonClick={this.redirectToAddSkillGroupPage}
        />
      { /* this.state.loading && <LoadingDots interval={100} dots={20} /> */}
        {this.props.skill_groups.length
          ?
            <SkillGroupList
              skill_groups={this.props.skill_groups}
              onDeleteButtonClick={this.deleteSkillGroup}
            />
          : <LoadingSpinner />
        }
      </div>
    );
  }
}

SkillGroupsPage.propTypes = {
  company: PropTypes.object.isRequired,
  skill_groups: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    skill_groups: state.skillGroups
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(companyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillGroupsPage);
