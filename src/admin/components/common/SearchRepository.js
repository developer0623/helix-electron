import React, { PropTypes } from 'react';

const RepositorySearch = ({search, searchPlaceholder, searchButtonText, onSearchChange, onSearchButtonClick, onOpenModalButtonClick}) => {
  return (
    <div>
      <div className="btn-toolbar repository-search">
        <div className="flextable-item flextable-primary">
          <div className="input-with-icon">
            <input type="text"
              className="form-control input-block"
              placeholder={searchPlaceholder}
              value={search}
              onChange={onSearchChange} />
            <span className="icon icons icon-magnifier"></span>
          </div>
        </div>
        <button className="btn btn-primary btn-pill"
          onClick={onSearchButtonClick}>
            <span className="icons icon-plus"></span>
            {searchButtonText}
        </button>
        <button className="btn btn-primary btn-pill"
          onClick={onOpenModalButtonClick}>
            <span className="icons icon-cloud-upload"></span>
            Upload
        </button>
      </div>
    </div>
  );
};

RepositorySearch.propTypes = {
  search: PropTypes.string,
  searchPlaceholder: PropTypes.string.isRequired,
  searchButtonText: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearchButtonClick: PropTypes.func.isRequired,
  onOpenModalButtonClick: PropTypes.func.isRequired
};

export default RepositorySearch;
