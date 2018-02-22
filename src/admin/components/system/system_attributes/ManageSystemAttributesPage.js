import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as systemActions from '../../../actions/systemActions';
import DashboardHeader from '../../common/DashboardHeader';
import Filters from '../Filters';
import AttributeForm from './AttributeForm';
import toastr from 'toastr';
import {_} from 'lodash';

class ManageSystemAttributesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      system: Object.assign({}, this.props.system),
      errors: {},
      saving: false
    };
    this.loginWithAmazon = this.loginWithAmazon.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({system: Object.assign({}, nextProps.system)});
  }
  loginWithAmazon(event) {
    const url = '/admin/auth/amazon';
    const name = 'amazon_login';
    const specs = 'width=800,height=500';

    window.open(url, name, specs);
  }
  render() {
    return (
      <div>
        <Filters />
        <DashboardHeader
          dashboardTitle="System Attributes" />
        <AttributeForm
          system={this.state.system}
          errors={this.state.errors}
          saving={this.state.saving}
          loginWithAmazon={this.loginWithAmazon}
        />
      </div>
    );
  }
}

ManageSystemAttributesPage.propTypes = {
  system: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageSystemAttributesPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let system = {
    attributes: []
  };
  if (state.system) {
    system = state.system;
  }
  return {
    system: system
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(systemActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSystemAttributesPage);
