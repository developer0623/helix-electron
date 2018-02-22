import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import KeywordInput from '../../common/KeywordInput';
import PropertyListRow from './PropertyListRow';
import _ from 'lodash';

const PropertyForm = ({repository, properties, onAudioPreviewClicked, onAddButtonClick, onDeleteButtonClick, onEditButtonClick, onUpdateRepository, onSaveRepository, loading, saving, errors}) => {
  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="name"
              label="Repository Name"
              value={repository.name}
              onChange={onUpdateRepository}
              error={errors.name}
              placeholder="Enter name of the repository"
              width={8} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextArea
              name="description"
              label="Description"
              value={repository.description}
              onChange={onUpdateRepository}
              error={errors.description}
              placeholder="Enter description of the repository"
              rows={8}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="default_response_format"
              label="Default Reponse Format"
              value={repository.default_response_format}
              onChange={onUpdateRepository}
              error={errors.default_response_format}
              placeholder="Enter the format string for the response"
              width={8} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="default_negative_response_format"
              label="Default Negative Reponse Format"
              value={repository.default_negative_response_format}
              onChange={onUpdateRepository}
              error={errors.default_negative_response_format}
              placeholder="Enter the format string for a negative response"
              width={8} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="default_positive_response_format"
              label="Default Positive Reponse Format"
              value={repository.default_positive_response_format}
              onChange={onUpdateRepository}
              error={errors.default_positive_response_format}
              placeholder="Enter the format string for a positive response"
              width={8} />
          </div>
        </div>
        <div className="row" style={{'marginTop': '40px',
          'borderBottom': 'solid 1px #e4e4e4',
          'marginBottom': '20px'
        }}>
          <div className="col-md-12">
            <div className="flextable mb-2">
              <div className="flextable-item flextable-primary">
                <h4>Property Types</h4>
              </div>
              <div className="flextable-item">
                <button
                  className="btn btn-primary btn-pill"
                  onClick={onAddButtonClick}>
                  Add Property Type
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="container-fluid pl-0">
              {properties.length && properties.map(property =>
                <PropertyListRow key={property._id}
                  repository={repository}
                  property={property}
                  onDeleteButtonClick={onDeleteButtonClick}
                  onEditButtonClick={onEditButtonClick} />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <input
              type="submit"
              disabled={saving}
              value={saving ? 'Saving Changes...' : 'Save Changes'}
              className="btn btn-primary"
              onClick={onSaveRepository} />
          </div>
        </div>
      </div>
    </form>
  );
};

PropertyForm.propTypes = {
  repository: React.PropTypes.object.isRequired,
  properties: React.PropTypes.array.isRequired,
  onAddButtonClick: React.PropTypes.func.isRequired,
  onEditButtonClick: React.PropTypes.func.isRequired,
  onDeleteButtonClick: React.PropTypes.func.isRequired,
  onAudioPreviewClicked: React.PropTypes.func,
  onUpdateRepository: React.PropTypes.func.isRequired,
  onSaveRepository: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default PropertyForm;
