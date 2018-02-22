import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../TextInput';
import TextArea from '../../TextArea';
import SelectInput from '../../SelectInput';
import _ from 'lodash';
import ReactAudioPlayer from 'react-audio-player';

const EntityPropertyListRow = ({property, entityProperties, rowIndex, onPreviewEntityProperty, onDeleteEntityProperty, onChangeEntityProperty, errors}) => {
  let audio;
  const propertyTypeKey = "EntityPropertyType_" + rowIndex;
  const propertyValueKey = "EntityPropertyValue_" + rowIndex;

  const propertyTypes = _.map(entityProperties, (property) => {
    return {
      value: property.name_lower,
      text: property.name
    };
  });
  function onPreviewEntityPropertyAtIndex(event) {
    return onPreviewEntityProperty(event, rowIndex, audio);
  }
  function onChangeEntityPropertyAtIndex(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    return onChangeEntityProperty(event, rowIndex, field, value);
  }
  function onDeleteEntityPropertyAtIndex(e) {
    onDeleteEntityProperty(rowIndex, e);
  }
  return (
    <div className="row">
      <div className="col-md-10">
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              <ReactAudioPlayer
                ref={function(element){ audio = element; }} />
              <button type="button" className="btn btn-xs btn-pill btn-primary" onClick={onPreviewEntityPropertyAtIndex}>
                <span className="icon icon-triangle-right navbar-brand-icon"></span>
              </button>
            </div>
            <div className="col-md-3">
              <SelectInput
                key={propertyTypeKey}
                name="key"
                label=""
                value={property.key.toLowerCase()}
                onChange={onChangeEntityPropertyAtIndex}
                error={errors.property}
                options={propertyTypes} />
            </div>
            <div className="col-md-6">
            <TextInput
              key={propertyValueKey}
              name="value"
              value={property.value}
              onChange={onChangeEntityPropertyAtIndex}
              error={errors.property}
              placeholder="Enter Property Value"
              data-index={rowIndex} />
            </div>
            <div className="col-md-2">
              <div className="flextable-item">
                {rowIndex !=0 &&
                  <button type="button" className="btn btn-xs btn-pill btn-primary" onClick={onDeleteEntityPropertyAtIndex}>Delete Property</button>}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

EntityPropertyListRow.propTypes = {
  property: PropTypes.object.isRequired,
  entityProperties: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onPreviewEntityProperty: PropTypes.func.isRequired,
  onDeleteEntityProperty: React.PropTypes.func.isRequired,
  onChangeEntityProperty: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default EntityPropertyListRow;
