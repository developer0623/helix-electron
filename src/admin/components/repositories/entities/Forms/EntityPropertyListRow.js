import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
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
  function onDeleteEntityPropertyAtIndex(event) {
    onDeleteEntityProperty(event, rowIndex);
  }
  return (
    <div className="row">
      <div className="col-md-12 pl-0 pr-0">
        <div className="container">
          <div className="row">
            <div className="col-md-1 pl-0 pr-0 text-center" style={{'margin': 'auto'}}>
              <i className="icons icon-close delete-button" onClick={onDeleteEntityPropertyAtIndex} />
            </div>
            <div className="col-md-5 pl-0 pr-0" style={{'margin': 'auto'}}>
              <SelectInput
                key={propertyTypeKey}
                name="key"
                label=""
                value={property.key}
                onChange={onChangeEntityPropertyAtIndex}
                error={errors.property}
                options={propertyTypes} />
            </div>
            <div className="col-md-5 pl-0 pr-0">
              <TextInput
                key={propertyValueKey}
                name="value"
                value={property.value}
                onChange={onChangeEntityPropertyAtIndex}
                error={errors.property}
                placeholder="Enter Property Value"
                data-index={rowIndex} />
            </div>
            <div className="col-md-1 pl-0 pr-0" style={{'margin': 'auto'}}>
              <div className="audio-preview">
                <ReactAudioPlayer
                  ref={function(element){ audio = element; }} />
                <button type="button" className="btn btn-xs btn-pill btn-primary" onClick={onPreviewEntityPropertyAtIndex}>
                  <span className="icons icon-control-play"></span>
                </button>
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
