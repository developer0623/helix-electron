import React, { PropTypes } from 'react';

const DashboardHeader = ({dashboardTitle, actionButtonText, onActionButtonClick}) => {
  return (
    <div>
      <div className="btn-toolbar" style={{'display': 'table'}}>
        <div className="flextable-item flextable-primary">
          <div className="dashhead">
            <div className="dashhead-titles">
              <h6 className="dashhead-subtitle">Dashboards</h6>
              <h2 className="dashhead-title">{dashboardTitle}</h2>
            </div>
          </div>
        </div>
        <button type="button"
          className="btn btn-secondary btn-pill"
          onClick={onActionButtonClick}>{actionButtonText}</button>
      </div>
    </div>
  );
};

DashboardHeader.propTypes = {
  dashboardTitle: PropTypes.string.isRequired,
  actionButtonText: PropTypes.string.isRequired,
  onActionButtonClick: PropTypes.func.isRequired
};

export default DashboardHeader;
