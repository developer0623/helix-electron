import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as companyActions from '../../../actions/companyActions';
import DashboardHeader from '../../common/DashboardHeader';
import CompanyForm from './CompanyForm';
import toastr from 'toastr';
import upload from 'superagent';
import _ from 'lodash';
import LoadingSpinner from '../../common/LoadingSpinner';

class ManageCompanyPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      company: Object.assign({}, this.props.company),
      keyword: "",
      logoUrl: (this.props.company && this.props.company.logo) ? this.props.company.logo : null,
      errors: {
        contact: {},
        physical_address: {}
      },
      saving: false
    };
    this.updateCompanyState = this.updateCompanyState.bind(this);
    this.disconnectAmazon = this.disconnectAmazon.bind(this);
    this.loginWithAmazon = this.loginWithAmazon.bind(this);
    this.saveCompany = this.saveCompany.bind(this);
    this.addKeyword = this.addKeyword.bind(this);
    this.removeKeyword = this.removeKeyword.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.changeContact = this.changeContact.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.addOrganizationUser = this.addOrganizationUser.bind(this);
    this.editOrganizationUser = this.editOrganizationUser.bind(this);
    this.deleteOrganizationUser = this.deleteOrganizationUser.bind(this);
    this.uploadLogo = this.uploadLogo.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.company._id != nextProps.company._id) {
      this.setState({
        company: Object.assign({}, nextProps.company),
        logoUrl: (nextProps.company.logo) ? nextProps.company.logo : null
      });
    }
  }
  updateCompanyState(event) {
    const field = event.target.name;

    let company = this.state.company;
    company[field] = event.target.value;
    return this.setState({company: company});
  }
  addKeyword(event) {
    event.preventDefault();

    const keyword = this.state.keyword;
    const company = this.state.company;

    company.keywords.push(keyword);

    return this.setState({
      company: this.deepCopy(company),
      keyword: ''
    });
  }
  removeKeyword(event, keyword) {
    event.preventDefault();

    let company = this.state.company;

    company.keywords = _.pull(company.keywords, keyword);

    return this.setState({company: this.deepCopy(company) });
  }
  changeKeyword(event) {
    event.preventDefault;

    const keyword = event.target.value;

    return this.setState({keyword: keyword });
  }
  changeContact(event) {
    event.preventDefault();

    let company = this.state.company;

    const field = event.target.name;
    company.contact[field] = event.target.value;

    return this.setState({company: company});
  }
  changeAddress(event) {
    event.preventDefault();

    let company = this.state.company;

    const field = event.target.name;
    company.physical_address[field] = event.target.value;

    return this.setState({company: company});
  }
  uploadLogo(files) {
    this.setState({saving: true});

    upload.post(`/api/companies/${this.state.company._id}/upload/logo`)
    .attach('filename', files[0])
    .end((err, res) => {
      if (err) {
        toastr.error(err);
        this.setState({saving: false});
      } else {
        const company = this.state.company;
        const fileLocation = res.body.file_location;
        const filename = res.body.file_name;

        company.logo = filename;

        this.setState({company: this.deepCopy(company) });
        this.setState({logoUrl: fileLocation});
        this.setState({saving: false});
      }
    });
  }
  disconnectAmazon(event) {
    event.preventDefault();

    let company = this.state.company;

    company.amazon_oauth_token = null;

    this.setState({company: company});

    this.saveCompany(event);
  }
  loginWithAmazon(event) {
    event.preventDefault();

    const url = '/admin/auth/amazon';
    const name = 'amazon_login';
    const specs = 'width=800,height=500';

    window.open(url, name, specs);
  }
  validateForm() {
    const errors = {
      contact: {},
      physical_address: {}
    };
		let formIsValid = true;

    this.setState({errors: errors});

    const company = this.state.company;

		if (_.isEmpty(company.name) || company.name.length < 3) {
			errors.name = 'Company Name is required and must be at least 3 characters.';
			formIsValid = false;
		}
		if (_.isEmpty(company.contact.first_name)) {
			errors.contact.first_name = 'First Name is required.';
			formIsValid = false;
		}
    if (_.isEmpty(company.contact.last_name)) {
      errors.contact.last_name = 'Last Name is required.';
      formIsValid = false;
    }
    if (_.isEmpty(company.contact.email_address)) {
      errors.contact.email_address = 'Email Address is required.';
      formIsValid = false;
    }
    if (_.isEmpty(company.contact.phone_number)) {
      errors.contact.phone_number = 'Phone Number is required..';
      formIsValid = false;
    }
    if (_.isEmpty(company.physical_address.address_1)) {
      errors.physical_address.address_1 = 'Street Address 1 is required.';
      formIsValid = false;
    }
    if (_.isEmpty(company.physical_address.city)) {
      errors.physical_address.city = 'City is required.';
      formIsValid = false;
    }
    if (_.isEmpty(company.physical_address.state)) {
      errors.physical_address.state = 'State is required.';
      formIsValid = false;
    }
    if (_.isEmpty(company.physical_address.zip_code)) {
      errors.physical_address.zip_code = 'Zip code is required.';
      formIsValid = false;
    }

		this.setState({errors: errors});
		return formIsValid;
	}
  saveCompany(event) {
    event.preventDefault();

    if (!this.validateForm()) {
			return;
		}
    this.setState({saving: true});

    this.props.actions.saveCompany(this.state.company)
      .then(() => {
        this.setState({saving: false});

        toastr.success('Profile Saved');
      })
      .catch(error => {
        toastr.error(error);

        this.setState({saving: false});
      });
  }
  addOrganizationUser(event) {
    event.preventDefault();

     this.props.history.push(`/admin/organization/users/new`);
  }
  editOrganizationUser(event, user) {
    event.preventDefault();

     this.props.history.push(`/admin/organization/users/${user._id}`);
  }
  deleteOrganizationUser(event, user) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.actions.deleteOrganizationUser(this.state.company, user)
    .then(() => {
      this.setState({saving: false});

      toastr.success('Organization User Deleted');
    })
    .catch(error => {
      toastr.error(error);

      this.setState({saving: false});
    });
  }
  deepCopy(company) {
    let newCompany = Object.assign({}, company);

    newCompany.keywords = [];
    _.each(company.keywords, (keyword) => {
      newCompany.keywords.push(keyword);
    });

    return newCompany;
  }
  render() {
    const { company } = this.props;

    return (
      <div>
        <DashboardHeader
          dashboardTitle="Organization Profile" />
        {company && company._id ?
          <CompanyForm
            company={this.state.company}
            logoUrl={this.state.logoUrl}
            keyword={this.state.keyword}
            errors={this.state.errors}
            saving={this.state.saving}
            onChange={this.updateCompanyState}
            onSave={this.saveCompany}
            loginWithAmazon={this.loginWithAmazon}
            disconnectAmazon={this.disconnectAmazon}
            onAddKeyword={this.addKeyword}
            onChangeKeyword={this.changeKeyword}
            onChangeContact={this.changeContact}
            onChangeAddress={this.changeAddress}
            onRemoveKeyword={this.removeKeyword}
            onEditUser={this.editOrganizationUser}
            onDeleteUser={this.deleteOrganizationUser}
            onUploadLogo={this.uploadLogo}
          /> : <LoadingSpinner />
      }
      </div>
    );
  }
}

ManageCompanyPage.propTypes = {
  company: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCompanyPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const company = state.auth.company;

  if(!company.contact) {
    const contact = {
      first_name: "",
      last_name: "",
      email_address: "",
      phone_number: ""
    };

    company.contact = contact;
  }
  if(!company.physical_address) {
    const physical_address = {
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zip_code: ""
    };

    company.physical_address = physical_address;
  }
  return {
    company: company
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(companyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCompanyPage);
