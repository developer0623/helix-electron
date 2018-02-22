import React, { PropTypes } from 'react';

const SetupHeader = ({headerText, onCloseClicked}) => {
  return (
    <div className="fixed-top setup-step-header">
      <h5>{headerText}</h5>
      <div onClick={onCloseClicked} className="setup-step-close">
        <i className="icons icon-close" />
      </div>
    </div>
  );
};

SetupHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
  onClickClicked: PropTypes.func.isRequired,
  onCloseClicked: PropTypes.func.isRequired

};

export default SetupHeader;
