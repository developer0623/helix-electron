import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registerActions from '../../actions/registerActions';
import { Link } from 'react-router';
import RegisterForm from './RegisterForm';

class RegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, this.props.user),
      credentials: Object.assign({}, this.props.credentials),
      errors: {},
      saving: false
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }
  updateUserState(event) {
      const field = event.target.name;
      let user = this.state.user;
      user[field] = event.target.value;
      return this.setState({user: user});
  }
  registerUser(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.registerUser(this.state.user, this.state.credentials)
      .then(() =>
        this.redirect()
      )
      .catch(error => {
        this.setState({saving: false});
      });
  }
  onLoginClick(event) {
    event.preventDefault();

    this.context.router.push('/login?client_id=' + this.props.credentials.client_id + '&redirect_uri=' + this.props.credentials.redirect_uri + '&response_type=' + this.props.credentials.response_type + '&state=' + this.props.credentials.state);
  }
  redirect() {
    this.setState({saving: false});

    this.context.router.push('/dashboard');
  }
  render() {
    return (
      <div id="register">
        <div className="container">
          <RegisterForm
            user={this.state.user}
            onChange={this.updateUserState}
            onRegisterClick={this.registerUser}
            onLoginClick={this.onLoginClick}
            saving={this.state.saving}
            errors={this.state.errors}
          />
        </div>
      </div>
    );
  }
}
RegisterPage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired
};
RegisterPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let user = {
    first_name: '',
    last_name: '',
    company_name: '',
    email_address: '',
    password: ''
  };
  let credentials = {
    client_id: ownProps.location.query.client_id,
    redirect_uri: ownProps.location.query.redirect_uri,
    response_type: ownProps.location.query.response_type,
    state: ownProps.location.query.state
  };
  return {
    user: user,
    credentials: credentials
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(registerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
