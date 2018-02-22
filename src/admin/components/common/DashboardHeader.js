import React, { PropTypes } from 'react';
import './DashboardHeader.css';

const DashboardHeader = ({dashboardTitle, AddItemTemplate, buttonText, onButtonClick}) => {
  return (
    <div className="dashboard-header">
      <div className="btn-toolbar">
        <div className="flextable-item flextable-primary">
          <div className="dashhead">
            <div className="dashhead-titles">
              <h6 className="dashhead-subtitle">Dashboards</h6>
              <h2 className="dashhead-title">{dashboardTitle}</h2>
            </div>
            {AddItemTemplate && <AddItemTemplate
              onButtonClick={onButtonClick}
              buttonText={buttonText}
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardHeader.propTypes = {
  dashboardTitle: PropTypes.string.isRequired,
  AddItemTemplate: PropTypes.func,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func
};

export default DashboardHeader;
