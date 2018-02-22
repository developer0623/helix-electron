import React, {PropTypes} from 'react';

const ApplicationMenuItem = ({application, applicationChangedClick}) => {
  function onApplicationChangedClick(e) {
    applicationChangedClick(e, application);
  }
  return (
    <li className="account-dropdown__link">
      <a className="account-dropdown__link__anchor" href="#" onClick={onApplicationChangedClick}>
        {application.lab_name}
      </a>
    </li>
  );
};

ApplicationMenuItem.propTypes = {
  application: PropTypes.object.isRequired,
  applicationChangedClick: React.PropTypes.func.isRequired
};

export default ApplicationMenuItem;
