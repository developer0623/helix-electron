import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import _ from 'lodash';
import DashboardHeader from '../common/DashboardHeader';
import IamRolePopup from './IamRolePopup';
import OnboardingItem from './OnboardingItem';
import * as companyActions from '../../actions/companyActions';

class OnboardingPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showRolePopup: false
    };
    this.onButtonClickOnboardingState1 = this.onButtonClickOnboardingState1.bind(this);
    this.onButtonClickOnboardingState2 = this.onButtonClickOnboardingState2.bind(this);
    this.onButtonClickOnboardingState3 = this.onButtonClickOnboardingState3.bind(this);
    this.onButtonClickOnboardingState4 = this.onButtonClickOnboardingState4.bind(this);
    this.onButtonClickOnboardingState5 = this.onButtonClickOnboardingState5.bind(this);
    this.saveCompany = this.saveCompany.bind(this);
    this.onCancelIamRole = this.onCancelIamRole.bind(this);
  }
  getOnboardingState1() {
    return (this.props.company.amazon_oauth_token) ? true : false;
  }
  getOnboardingState2() {
    return (this.props.company.amazon_iam_role_arn) ? true : false;
  }
  getOnboardingState3() {
    return (this.props.applications.length > 0) ? true : false;
  }
  getOnboardingState4() {
    return (this.props.labs.length > 0) ? true : false;
  }
  getNextSuggestedState() {
    if(this.getOnboardingState4()) {
      return 5;
    }
    if(this.getOnboardingState3()) {
      return 4;
    }
    if(this.getOnboardingState2()) {
      return 3;
    }
    if(this.getOnboardingState1()) {
      return 2;
    }
    return 1;
  }
  isOnboardStateButtonEnabled(state) {
    return state <= this.getNextSuggestedState();
  }
  isNextSuggestedState(state) {
    return state == this.getNextSuggestedState();
  }
  onButtonClickOnboardingState1(event) {
    event.preventDefault();

    if(this.getOnboardingState1()) {
      this.disconnectAmazon();
    } else {
      this.loginwithAmazon();
    }
  }
  onButtonClickOnboardingState2(event) {
    event.preventDefault();

    if(this.getOnboardingState2()) {
      this.removeIamRole();
    } else {
      this.toggleIamRolePopup();
    }
  }
  onButtonClickOnboardingState3(event) {
    if(this.getOnboardingState3()) {
       this.props.history.push(`/admin/applications/${this.props.applications[0]._id}/settings`);
    } else {
       this.props.history.push(`/admin/onboard/setup_application`);
    }
  }
  onButtonClickOnboardingState4(event) {
    if(this.getOnboardingState4()) {
       this.props.history.push(`/admin/labs/${this.props.labs[0]._id}/settings`);
    } else {
       this.props.history.push(`/admin/onboard/setup_lab`);
    }
  }
  onButtonClickOnboardingState5(event) {
    event.preventDefault();

    let company = Object.assign({}, this.props.company);
    company.onboarding_complete = true;

    this.props.actions.saveCompany(company)
      .then(() => {
         this.props.history.push(`/admin/repositories`);
      })
      .catch(error => {
        toastr.error(error);
      });
  }
  toggleIamRolePopup() {
    this.setState({
      showRolePopup: !this.state.showRolePopup
    });
  }
  removeIamRole() {
    let company = Object.assign({}, this.props.company);
    company.amazon_iam_role_arn = null;
    this.saveCompany(company);
  }
  loginwithAmazon() {
    const url = '/admin/auth/amazon';
    const name = 'amazon_login';
    const specs = 'width=800,height=500';

    window.open(url, name, specs);
  }
  disconnectAmazon() {
    let company = Object.assign({}, this.props.company);
    company.amazon_oauth_token = null;

    this.saveCompany(company);
  }
  saveCompany(company) {
    this.props.actions.saveCompany(company)
      .then(() => {
        toastr.success('success');
      })
      .catch(error => {
        toastr.error(error);
      });
      this.setState({showRolePopup: false});
  }
  onCancelIamRole() {
    this.setState({showRolePopup: false});
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Getting Started"
        />
        <OnboardingItem
          itemNumber={1}
          header="Connect to Your Organization's Amazon Account"
          content="HelixAI uses the Amazon Alexa platform to create your organization’s own custom private Alexa skill. We create your private skill in your organization’s Amazon account. Ultimately, your organization owns the skill built on the HelixAI platform."
          buttonText={(this.getOnboardingState1()) ? "Disconnect Amazon" : "Connect Amazon"}
          buttonEnabled={this.isOnboardStateButtonEnabled(1)}
          onButtonClick={this.onButtonClickOnboardingState1}
          boardClassName={(this.getOnboardingState1()) ? "boarditem --completed" : (this.isNextSuggestedState(1)) ? "boarditem --active" : "boarditem --inactive"}
          buttonClassName={(this.getOnboardingState1()) ? "pink" : "green"}
        />
        <OnboardingItem
          itemNumber={2}
          header="Setup an AWS IAM Role"
          content="Your virtual assistant is provisioned to your lab using the Amazon Alexa for Business service. In order for use to setup your lab and provision devices we need you to setup permission for us to do so by creating an IAM role within AWS."
          buttonText={(this.getOnboardingState2()) ? "Remove Permission" : "Setup IAM Role"}
          buttonEnabled={this.isOnboardStateButtonEnabled(2)}
          onButtonClick={this.onButtonClickOnboardingState2}
          boardClassName={(this.getOnboardingState2()) ? "boarditem --completed" : (this.isNextSuggestedState(2)) ? "boarditem --active" : "boarditem --inactive"}
          buttonClassName={(this.getOnboardingState2()) ? "pink" : "green"}
        />
        <OnboardingItem
          itemNumber={3}
          header="Create Your Virtual Assistant"
          content="Your virtual assistant is provisioned to your lab using the Amazon Alexa for Business service. In order for use to setup your lab and provision devices we need you to setup permission for us to do so by creating an IAM role within AWS."
          buttonText={(this.getOnboardingState3()) ? "Update" : "Setup Virtual Assistant"}
          buttonEnabled={this.isOnboardStateButtonEnabled(3)}
          onButtonClick={this.onButtonClickOnboardingState3}
          boardClassName={(this.getOnboardingState3()) ? "boarditem --completed" : (this.isNextSuggestedState(3)) ? "boarditem --active" : "boarditem --inactive"}
          buttonClassName={(this.getOnboardingState3()) ? "pink" : "green"}
        />
        <OnboardingItem
          itemNumber={4}
          header="Setup Lab Spaces"
          content="Your virtual assistant is provisioned to your lab using the Amazon Alexa for Business service. In order for use to setup your lab and provision devices we need you to setup permission for us to do so by creating an IAM role within AWS."
          buttonText={(this.getOnboardingState4()) ? "Update" : "Setup a Lab Space"}
          buttonEnabled={this.isOnboardStateButtonEnabled(4)}
          onButtonClick={this.onButtonClickOnboardingState4}
          boardClassName={(this.getOnboardingState4()) ? "boarditem --completed" : (this.isNextSuggestedState(4)) ? "boarditem --active" : "boarditem --inactive"}
          buttonClassName={(this.getOnboardingState4()) ? "pink" : "green"}
        />
        <OnboardingItem
          itemNumber={5}
          header="Add Your Custom Content"
          content="Add your organization’s inventory, protocols, recipes and even videos. Anything you add through your web portal becomes availaible thru your virtual assistant."
          buttonText="Add Content"
          buttonEnabled={this.isOnboardStateButtonEnabled(5)}
          onButtonClick={this.onButtonClickOnboardingState5}
          boardClassName="boarditem --inactive"
          buttonClassName="green"
        />
        {this.state.showRolePopup ?
          <IamRolePopup company={this.props.company}
            onSave={function(company){this.saveCompany(company);}}
            onCancel={this.onCancelIamRole}
          />
          : null
        }

      </div>
    );
  }
}

OnboardingPage.propTypes = {
  company: PropTypes.object.isRequired,
  applications: PropTypes.array.isRequired,
  labs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    company: state.auth.company,
    applications: state.auth.applications,
    labs: state.auth.labs,
    user: state.auth.currentUser
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(companyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingPage);
