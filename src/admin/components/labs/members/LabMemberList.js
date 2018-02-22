import React, {PropTypes} from 'react';
import ReactPaginate from 'react-paginate';
import LoadingDots from '../../common/LoadingDots';
import EmptyState from '../../common/EmptyState';
import LabMemberListRow from './LabMemberRow';

const LabMemberList = ({labMembers, onDeleteButtonClick, onAddLabMemberButtonClick, loading}) => {
  if (labMembers.length == 0) {
    return (
      <EmptyState
        emptyStateText="Make your lab’s protocols accessible thru your virtual assistant"
        emptyStateButtonText="Add a Lab Member"
        emptyStateSecondaryText="You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items"
        onEmptyStateButtonClick={onAddLabMemberButtonClick}
      />
    );
  }
  return (
    <div>
      <div className="labMemberList">
        {labMembers.map(labMember =>
          <LabMemberListRow
            key={labMember._id}
            lab_member={labMember}
            onDeleteButtonClick={onDeleteButtonClick} />
        )}
      </div>
    </div>
  );
};

LabMemberList.propTypes = {
  labMembers: PropTypes.array.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  onAddLabMemberButtonClick: React.PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default LabMemberList;
