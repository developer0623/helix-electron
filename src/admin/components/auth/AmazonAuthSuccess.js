// AuthSuccess.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactQueryParams from 'react-query-params';
import * as companyActions from '../../actions/companyActions';
import toastr from 'toastr';

const CLIENT_ID = "AmazonLogin";
class AmazonAuthSuccess extends ReactQueryParams {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      saving: false,
      savedCompany: false
    };

    this.saveCompany = this.saveCompany.bind(this);
  }
  saveCompany() {
    const access_token = this.queryParams.access_token;
    const refresh_token = this.queryParams.refresh_token;
    // const url = '/admin/profile';
    const url = '/admin/onboard';
    let company = Object.assign({}, this.props.company);
    company.amazon_oauth_token = {
      access_token: access_token,
      refresh_token: refresh_token
    };

    this.props.actions.saveCompany(company)
    .then(() => {
      window.opener.open(url, '_self');
      window.opener.focus();
      window.close();

      this.setState({saving: false});
    })
    .catch(error => {
      toastr.error(error);

      this.setState({saving: false});
    });
  }
  render() {
    if(!this.state.savedCompany && this.props.company.name) {
      this.saveCompany();
      this.setState({
        savedCompany: true
      });
    }
    return (
      <div>
        AUTH SUCCESS!
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(companyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AmazonAuthSuccess);
