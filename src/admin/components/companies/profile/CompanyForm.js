import React from 'react';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';
import FileUpload from '../../common/FileUpload';
import KeywordInput from '../../common/KeywordInput';
import ContactInput from '../../common/ContactInput';
import AddressInput from '../../common/AddressInput';
import UserInput from '../../common/UserInput';
import { Link } from 'react-router-dom';

const CompanyForm = ({company, logoUrl, onSave, onChange, loginWithAmazon, disconnectAmazon, onUploadLogo, keyword, onAddKeyword, onRemoveKeyword, onChangeKeyword, onChangeContact, onChangeAddress, onEditUser, onDeleteUser, loading, saving, errors}) => {
  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="name"
                label="Company Name"
                placeholder="Enter Company Name"
                value={company.name}
                onChange={onChange}
                error={errors.name}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The name will be displayed in the Amazon/Alexa store and Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <label htmlFor="logo">Logo</label>
              <FileUpload
                onDrop={onUploadLogo}
                helpText="Upload File"
                image={(logoUrl && logoUrl.length > 0) ? logoUrl : null}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Your company’s logo will be displayed in the Alexa App and Google Home store.  Also, the logo will be displayed on devices with visual displays (Echo Show).
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <KeywordInput
                name="keywords"
                label="Keywords"
                keyword={keyword}
                keywords={company.keywords}
                onChange={onChange}
                onAddKeyword={onAddKeyword}
                onRemoveKeyword={onRemoveKeyword}
                onChangeKeyword={onChangeKeyword}
                error={errors.keywords}
                placeholder="Add a keyword"
              />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              Add keywords that describe your virtual assistant to help users find your app in the Alexa App or Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h5>Contact Information</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
                <ContactInput
                  contact={company.contact}
                  onChange={onChangeContact}
                  errors={errors.contact}
                />
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The name will be displayed in the Amazon/Alexa store and Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h5>Organization Address</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <AddressInput
                address={company.physical_address}
                onChange={onChangeAddress}
                errors={errors.physical_address}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The name will be displayed in the Amazon/Alexa store and Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

CompanyForm.propTypes = {
  company: React.PropTypes.object.isRequired,
  logoUrl: React.PropTypes.string,
  keyword: React.PropTypes.string.isRequired,
  loginWithAmazon: React.PropTypes.func.isRequired,
  disconnectAmazon: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onUploadLogo: React.PropTypes.func.isRequired,
  onAddKeyword: React.PropTypes.func.isRequired,
  onRemoveKeyword: React.PropTypes.func.isRequired,
  onChangeKeyword: React.PropTypes.func.isRequired,
  onChangeContact: React.PropTypes.func.isRequired,
  onChangeAddress: React.PropTypes.func.isRequired,
  onEditUser: React.PropTypes.func.isRequired,
  onDeleteUser: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CompanyForm;
