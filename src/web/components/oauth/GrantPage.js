import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as oAuth2Actions from '../../actions/oAuth2Actions';
import toastr from 'toastr';

class GrantPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      client: Object.assign({}, this.props.client),
      errors: {},
      saving: false
    };
    this.onAllowClicked = this.onAllowClicked.bind(this);
    this.onDenyClicked = this.onDenyClicked.bind(this);
  }
  onAllowClicked(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.grant({
      client_id: this.state.client.client_id
    })
    .then((result) => {
      this.setState({saving: false});
    })
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }
  onDenyClicked(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div id="oauth-grant">
        <p>Hi James</p>
        <p><b>{this.state.client.name}</b> is requesting <b>full access</b> to your account.</p>
        <p>Do you approve?</p>
        <form>
          <div>
            <input type="submit" value="Allow" id="allow" onClick={this.onAllowClicked} />
            <input type="submit" value="Deny" name="cancel" id="deny" onClick={this.onDenyClicked} />
          </div>
        </form>
      </div>
    );
  }
}
GrantPage.propTypes = {
  client: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  let client = {
    name: 'Amazon Alexa'
  };
  return {
    client: client
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(oAuth2Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GrantPage);
