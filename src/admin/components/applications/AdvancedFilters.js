import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router-dom';

const AdvancedFilters = ({ company, lab }) => {
  return (
    <div>
      <div className="filter-nav mt-4 mb-4">
        <div className="flextable">
          <div className="flextable-item">
            <ul className="nav nav-pills">
              <li className="nav-item active">
                <Link to={`/admin/applications/advanced`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Advanced Configuration</Link>
              </li>
              <li className="nav-item active">
                <Link to={`/admin/applications/custom_slots`} className="btn btn-pill btn-primary mr-1" activeClassName="active">Vocabulary</Link>
              </li>
            </ul>
          </div>
          <div className="flextable-item flextable-primary" style={{'paddingRight': '20px', 'textAlign': 'right'}}>
            <Link to={`/admin/applications/settings`} className="btn btn-pill btn-secondary" activeClassName="active">Basic</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

AdvancedFilters.propTypes = {
  company: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired
};

export default AdvancedFilters;
