import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import LoginForm from './LoginForm';
import _ from 'lodash';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      credentials: Object.assign({}, this.props.credentials),
      errors: {},
      saving: false
    };
    this.updateCredentialsState = this.updateCredentialsState.bind(this);
    this.authenticateCredentials = this.authenticateCredentials.bind(this);
    this.onCreateAccountClick = this.onCreateAccountClick.bind(this);
  }
  updateCredentialsState(event) {
      const field = event.target.name;
      let credentials = this.state.credentials;
      credentials[field] = event.target.value;
      return this.setState({credentials: credentials});
  }
  authenticateCredentials(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.authenticateUser(this.state.credentials)
      .then(() =>
        this.props.actions.loadMe()
          .then(() =>
            this.redirect()
          )
          .catch(error => {
            this.setState({saving: false});
          })
      )
      .catch(error => {
        this.setState({saving: false});
      });
  }
  onCreateAccountClick(event) {
    event.preventDefault();

    this.context.router.push('/register?client_id=' + this.props.credentials.client_id + '&redirect_uri=' + this.props.credentials.redirect_uri + '&response_type=' + this.props.credentials.response_type + '&state=' + this.props.credentials.state);
  }
  redirect() {
    this.setState({saving: false});

    this.context.router.push('/dashboard');
  }
  render() {
    return (
      <LoginForm
        credentials={this.state.credentials}
        onChange={this.updateCredentialsState}
        onAuthenticate={this.authenticateCredentials}
        onCreateAccountClick={this.onCreateAccountClick}
        saving={this.state.saving}
        errors={this.state.errors}
      />
    );
  }
}
LoginPage.propTypes = {
  credentials: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
LoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let credentials = {
    email_address: '',
    password: '',
    client_id: ownProps.location.query.client_id,
    redirect_uri: ownProps.location.query.redirect_uri,
    response_type: ownProps.location.query.response_type,
    state: ownProps.location.query.state
  };
  return {
    credentials: credentials
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
