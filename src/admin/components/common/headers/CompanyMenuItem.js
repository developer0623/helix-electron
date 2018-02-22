import React, {PropTypes} from 'react';

const CompanyMenuItem = ({company, companyChangedClick}) => {
  function onCompanyChangedClick(e) {
    companyChangedClick(company, e);
  }
  return (
    <li className="account-dropdown__link">
      <a className="account-dropdown__link__anchor" href="#" onClick={onCompanyChangedClick}>
        {company.name}
      </a>
    </li>
  );
};

CompanyMenuItem.propTypes = {
  company: PropTypes.object.isRequired,
  companyChangedClick: React.PropTypes.func.isRequired
};

export default CompanyMenuItem;
