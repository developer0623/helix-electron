import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import accessTokensApi from '../../../../api/systems/accessTokensApi';
import DashboardHeader from '../../common/DashboardHeader';
import Filters from '../Filters';
import LoadingDots from '../../common/LoadingDots';
import AccessTokenList from './AccessTokenList';
import toastr from 'toastr';

class AccessTokenPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false,
      saving: false,
      accessTokens: {
        results: [],
        current_page: 0,
        max_pages: 0
      }
    };
    this.deleteAccessToken = this.deleteAccessToken.bind(this);
    this.pageAccessTokens = this.pageAccessTokens.bind(this);
  }
  componentWillMount() {
    this.setState({ loading: true });

    this.loadAccessTokens();
  }
  deleteAccessToken(accessToken, event) {
    event.preventDefault();

    this.setState({saving: true});
    accessTokensApi.deleteAccessToken(accessToken)
    .then(() => {
      toastr.success('Access Token Deleted');

      this.setState({saving: false});
      this.loadAccessTokens();
    })
    .catch(error => {
      toastr.error(error);

      this.setState({saving: false});
    });
  }
  pageAccessTokens(data) {
    let selected = data.selected + 1;

    this.loadAccessTokens(selected);
  }
  loadAccessTokens(page) {
    accessTokensApi.getAllAccessTokens(page).then(accessTokens => {
      this.setState({
        loading: false,
        accessTokens: accessTokens
      });
    })
    .catch(err => {
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="Access Tokens" />
        {this.state.loading && <LoadingDots interval={100} dots={20} />}
        {!this.state.loading && <AccessTokenList
          accessTokens={this.state.accessTokens.results}
          numberOfPages={this.state.accessTokens.max_pages}
          handlePageClick={this.pageAccessTokens}
          onDeleteButtonClick={this.deleteAccessToken} />}
      </div>
    );
  }
}

AccessTokenPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessTokenPage);
