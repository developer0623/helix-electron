import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    return (
      <div className="auth-header">
        <img style={{width:'200px'}} src={require('../../../images/helix.png')} />
      </div>
    );
  }
}

Header.propTypes = {};

Header.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
