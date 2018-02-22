import React, {PropTypes} from 'react';
import LaboratoryProfileListRow from './LaboratoryProfileListRow';
import LaboratoryProfilesEmptyState from './LaboratoryProfilesEmptyState';

const LaboratoryProfileList = ({laboratory_profiles, onDeleteButtonClick}) => {
  if (laboratory_profiles.length == 0) {
    return (
      <LaboratoryProfilesEmptyState />
    );
  }
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
        <tr>
          <th className="header">Profile Name</th>
          <th className="header">Address</th>
          <th className="header">Timezone</th>
          <th className="header">Date Created</th>
          <th className="header"></th>
        </tr>
        </thead>
        <tbody>
        {laboratory_profiles.map(laboratory_profile =>
          <LaboratoryProfileListRow
            key={laboratory_profile._id}
            laboratory_profile={laboratory_profile}
            onDeleteButtonClick={onDeleteButtonClick} />
        )}
        </tbody>
      </table>
    </div>
  );
};

LaboratoryProfileList.propTypes = {
  laboratory_profiles: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default LaboratoryProfileList;
