import React, { PropTypes } from 'react';

const DashboardHeader = ({dashboardTitle, addButtonText, onAddButtonClick, search, searchPlaceholder, onSearchButtonClick}) => {
  return (
    <div>
      <div className="dashhead mt-4">
        <div className="dashhead-titles">
          <h6 className="dashhead-subtitle">Dashboards</h6>
          <h2 className="dashhead-title">{dashboardTitle}</h2>
        </div>

        <div className="btn-toolbar dashhead-toolbar">
          <div className="flextable-item flextable-primary">
            <div className="btn-toolbar-item input-with-icon">
              <input type="text"
                className="form-control input-block"
                placeholder={searchPlaceholder}
                value={search}
                onChange={onSearchButtonClick} />
              <span className="icon icon-magnifying-glass"></span>
            </div>
          </div>
          <input type="submit"
              value={addButtonText}
              className="btn btn-primary btn-pill"
              onClick={onAddButtonClick} />
        </div>
      </div>
    </div>
  );
};

DashboardHeader.propTypes = {
  dashboardTitle: PropTypes.string.isRequired,
  addButtonText: PropTypes.string.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  onSearchButtonClick: PropTypes.func.isRequired
};

export default DashboardHeader;
