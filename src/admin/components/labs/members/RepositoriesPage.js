import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../../common/DashboardHeader';
import Filters from '../Filters';
import * as labActions from '../../../actions/companies/labActions';
import * as repositoryActions from '../../../actions/labs/repositoryActions';
import toastr from 'toastr';
import LabMemberList from './LabMemberList';
import _ from 'lodash';

const REPOSITORY_TYPE_NAME = 'LabMembers';
const DATA_SET_TYPE = 'LABMEMBERS';
const ENTITY_TYPE = 'LABMEMBER';

class LabMemberPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lab: this.deepCopyLab(this.props.lab),
      errors: {},
      saving: false
    };
    this.createLabMembersRepository = this.createLabMembersRepository.bind(this);
    this.onDeleteLabMember = this.deleteLabMember.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.lab._id != nextProps.lab._id) {
      this.setState({lab: Object.assign({}, nextProps.lab)});
    }
  }
  deepCopyLab(lab) {
    let newLab = Object.assign({}, lab);

    newLab.lab_members = [];
    _.each(lab.lab_members, function(lab_member) {
      newLab.lab_members.push(Object.assign({}, lab_member));
    });

    return newLab;
  }
  createLabMembersRepository(event) {
    event.preventDefault();

    const repository = {
      repository_type: this.props.repositoryType,
      name: 'Lab Members',
      data_set_type: DATA_SET_TYPE,
      entity_type: ENTITY_TYPE,
      tags: [],
      attributes: {
        properties: []
      }
    };

    this.setState({saving: true});
    this.props.repositoryActions.saveRepository(this.props.lab._id, repository)
      .then((savedRepository) => {
         this.props.history.push(`/admin/labs/lab_members/${savedRepository._id}/entities/new`);
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  deleteLabMember(event) {
    event.preventDefault();

    this.setState({saving: true});
    this.props.actions.deleteLabMember(this.state.lab)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {
    this.setState({saving: false});
    toastr.success('Lab Member Deleted');
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="Lab Members"
        />
        <LabMemberList
          labMembers={this.state.lab.lab_members}
          onAddLabMemberButtonClick={this.createLabMembersRepository}
          onDeleteButtonClick={this.onDeleteLabMember}
          loading={this.props.loading} />
      </div>
    );
  }
}

LabMemberPage.propTypes = {
  lab: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  repositoryType: PropTypes.object.isRequired,
  repositoryActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let repositoryType;
  if(state.repositoryTypes && state.repositoryTypes.length > 0) {
    repositoryType = _.find(state.repositoryTypes, { type_name: REPOSITORY_TYPE_NAME });
  }

  return {
    company: state.auth.company,
    lab: state.auth.lab,
    repositoryType: repositoryType,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(labActions, dispatch),
    repositoryActions: bindActionCreators(repositoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LabMemberPage);
