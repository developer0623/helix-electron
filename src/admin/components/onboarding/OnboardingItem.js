import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const OnboardingItem = ({itemNumber, header, content, buttonText, onButtonClick, boardClassName, buttonEnabled, buttonClassName}) => {
  return (
    <div>
      <div className={`${boardClassName}`}>
        <div className="boarditem__index">
          <p>{itemNumber}</p>
          <i className="icon-check icons mr-2"></i>
        </div>
        <div className="boarditem__content">
            <p className="boarditem__content__title">{header}</p>
            <p className="boarditem__content__content">{content}</p>
        </div>
        <div className="boarditem__button">
          <button onClick={onButtonClick} disabled={!buttonEnabled} className={`btn btn-primary btn-pill ${buttonClassName}`} style={{'width': '100%', 'margin': '0 10%'}}>
            {buttonText}
          </button>
        </div>
      </div>

    </div>
  );
};

OnboardingItem.propTypes = {
  itemNumber: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  boardClassName: PropTypes.string.isRequired,
  buttonEnabled: PropTypes.bool.isRequired,
  buttonClassName: PropTypes.string.isRequired
};

export default OnboardingItem;
