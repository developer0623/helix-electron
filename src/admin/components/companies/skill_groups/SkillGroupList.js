import React, {PropTypes} from 'react';
import SkillGroupListRow from './SkillGroupListRow';
import SkillGroupsEmptyState from './SkillGroupsEmptyState';

const SkillGroupList = ({skill_groups, onDeleteButtonClick}) => {
  if (skill_groups.length == 0) {
    return (
      <SkillGroupsEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
        <tr>
          <th className="header">Skill Group Name</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {skill_groups.map(skill_group =>
          <SkillGroupListRow
            key={skill_group._id}
            skill_group={skill_group}
            onDeleteButtonClick={onDeleteButtonClick} />
        )}
        </tbody>
      </table>
      </div>
  );
};

SkillGroupList.propTypes = {
  skill_groups: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default SkillGroupList;
