import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const SkillGroupListRow = ({skill_group, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(skill_group, e);
  }
  return (
    <tr>
      <td><Link to={`/admin/organization/skill_groups/${skill_group._id}`}>{skill_group.skill_group_name}</Link></td>
      <td><a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

SkillGroupListRow.propTypes = {
  skill_group: PropTypes.object.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default SkillGroupListRow;
