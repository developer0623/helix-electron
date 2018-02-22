/* eslint-disable */
import React, {PropTypes} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pageStateAction from '../../actions/pageStateAction';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    const pageState = {header: this.props.header, footer: this.props.footer};
    this.props.pageStateAction.setPageState(pageState);
  }
  isAuthenticated() {
    if(sessionStorage.getItem('companyId') || sessionStorage.getItem('labId')) {
      return true;
    }
    return false;  
  }
  render() {
    return(
      <Route render={props => (
        this.isAuthenticated() ? (
          <this.props.component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/admin/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  header: PropTypes.string,
  footer: PropTypes.bool,
  exact: PropTypes.bool
};


function mapStateToProps(state, ownProps) {
  return {
    
  };
}
function mapDispatchToProps(dispatch) {
  return {
    pageStateAction: bindActionCreators(pageStateAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
