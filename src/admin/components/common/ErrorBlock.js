import React, { PropTypes } from 'react';

const ErrorBlock = ({error}) => {
  return (
    <div className="errorBlock">
      <p>{error}</p>
    </div>
  );
};

ErrorBlock.propTypes = {
  error: PropTypes.string.isRequired
};

export default ErrorBlock;
