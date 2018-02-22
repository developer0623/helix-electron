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
    <tr>
      <td style={{'width': '100%'}}><Link to={generateItemUrl()}>{repository.name || 'Repository Item'}</Link></td>
      <td>
        <Link to={`/admin/repositories/${repository.property_repository}/lookup_properties`}>Properties</Link>
        {' | '}
        <Link to={`/admin/repositories/${repository.lookup_qualifier_repository}/lookup_properties`}>Qualifiers</Link>
        {' | '}
        <a href="#" onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

RepositoryListRow.propTypes = {
  repository: PropTypes.object.isRequired,
  itemUrlPrefix: PropTypes.string.isRequired,
  itemUrlSuffix: PropTypes.string,
  onDeleteButtonClick: React.PropTypes.func.isRequired
};

export default RepositoryListRow;
