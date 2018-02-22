import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const IntentUtteranceItem = ({utterance}) => {
  return (
    <span>
      {utterance}
      <br />
    </span>
  );
};

IntentUtteranceItem.propTypes = {
  utterance: PropTypes.object.isRequired
};

export default IntentUtteranceItem;
