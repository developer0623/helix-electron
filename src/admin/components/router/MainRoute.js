/* eslint-disable */
import React, {PropTypes} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pageStateAction from '../../actions/pageStateAction';


class MainRoute extends React.Component {
  constructor(props) {
    super(props);
    const pageState = {header: this.props.header, footer: this.props.footer};
    this.props.pageStateAction.setPageState(pageState);
  }  
  render() {
    return(
      <Route render={props => (
        <this.props.component {...props}/>
      )}/>
    );
  }
}

MainRoute.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MainRoute);
