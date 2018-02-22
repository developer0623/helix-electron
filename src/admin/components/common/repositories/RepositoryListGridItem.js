import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const RepositoryListRow = ({repository, itemUrlPrefix, itemUrlSuffix, onDeleteButtonClick}) => {
  function onDelete(e) {
    onDeleteButtonClick(repository, e);
  }
  function generateItemUrl() {
    let itemLink = `${itemUrlPrefix}/${repository._id}`;

    if(itemUrlSuffix) {
      itemLink = `${itemLink}/${itemUrlSuffix}`;
    }

    return itemLink;
  }
  return (
    <div className="col-xs-4 col-md-3 col-lg-4">
      <div className="well well-lg">
        <Link to={generateItemUrl()}>{repository.name || 'Repository Item'}</Link>
        <a href="#" onClick={onDelete}>Delete</a>
      </div>
    </div>
  );
};

RepositoryListRow.propTypes = {
  repository: PropTypes.object.isRequired,
  itemUrlPrefix: PropTypes.string.isRequired,
  itemUrlSuffix: PropTypes.string,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default RepositoryListRow;
