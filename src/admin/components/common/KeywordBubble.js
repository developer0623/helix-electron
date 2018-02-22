import React, {PropTypes} from 'react';

const KeywordBubble = ({keyword, onRemove}) => {
  function onRemoveClicked(event) {
    onRemove(event, keyword);
  }
  return (
    <li className="list-inline-item keyword-bubble">
      <span className="keyword-wrapper">
        {keyword}
        <a href="#" onClick={onRemoveClicked} className="keyword-remove">
          <span className="icons icon-close"></span>
        </a>
      </span>
    </li>
  );
};

KeywordBubble.propTypes = {
  keyword: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default KeywordBubble;
