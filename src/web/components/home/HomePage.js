import ReactGA from 'react-ga';
import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as signUpActions from '../../actions/marketingSignUpActions';
import SignUpForm from './SignUpForm';
import SignUpSuccess from './SignUpSuccess';
import toastr from 'toastr';
import ScrollableAnchor, { configureAnchors, goToAnchor } from 'react-scrollable-anchor';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    configureAnchors({offset: -60, scrollDuration: 200});

    this.state = {
      signUp: Object.assign({}, this.props.signUp),
      errors: {},
      saving: false
    };
    this.updateSignUpState = this.updateSignUpState.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }
  updateSignUpState(event) {
      const field = event.target.name;
      let signUp = this.state.signUp;
      signUp[field] = event.target.value;
      return this.setState({signUp: signUp});
  }
  onSignUp(event) {
    event.preventDefault();
    ReactGA.event({
      category: 'HomePage',
      action: 'Early Access'
    });
    this.setState({saving: true});
    this.props.actions.addMarketingSignUp({
      full_name: this.state.signUp.full_name,
      email_address: this.state.signUp.email_address,
      message: this.state.signUp.message,
      campaign: 'Early Access'
    })
    .then(() => {
      let signUp = {
        full_name: '',
        email_address: '',
        message: '',
        show_success: true
      };

      this.setState({errors: {}});
      this.setState({signUp: signUp});
      this.setState({saving: false});
    })
    .catch(error => {
      let errors = {
        email_address: error
      };
      this.setState({errors: errors});
      this.setState({saving: false});
    });
  }
  onGetEarlyAccessClick() {
    goToAnchor('start');
  }
  render() {
    return (
      <div>
        <ScrollableAnchor id={'header'}>
          <div id="header" className="jumbotron">
            <img className="alexa pull-right" src={require('../../images/helix-hero-echo.png')}  />
            <div id="header-info">
              <div className="container">

                <div className="heading">
                  <h1>“Alexa, ask Helix to help me with a protocol.”</h1>
                  <p>Meet Helix, your new lab mate! Helix is an artificially intelligent, voice controlled virtual assistant for use in the laboratory sciences. Helix helps scientists by responding to verbal questions and requests without the need for hands-on interaction.</p>
                    <a
                     id="signup-button"
                     className="btn btn-lg btn-primary"
                     onClick={this.onGetEarlyAccessClick}>
                     Try Helix Now
                   </a>
                 </div>
              </div>
            </div>
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'overview'}>
          <div>
            <section id="benefits">
            <div className="container">
              <div className="row text-center">
                <div className="heading">
                  <h2>What can Helix do for your lab?</h2>
                </div>

                <div className="col-md-4 col-sm-6 item">
                  <img src={require('../../images/efficiency.png')} />
                  <h3>Increase Efficiency</h3>
                  <p>Helix is a hands free, convenient way to access information, reducing chances of human error and increasing efficiency in experiments.</p>
                </div>

                <div className="col-md-4 col-sm-6 item">
                  <img src={require('../../images/safety.png')} />
                <h3>Improve Lab Safety</h3>
                  <p>Helix can quickly access safety data sheets for chemicals and reagents, providing immediate information into potential safety hazards.</p>
                </div>

                <div className="col-md-4 col-md-offset-0 col-sm-6 col-sm-offset-3 item">
                  <img className="keep-current" src={require('../../images/current.png')} />
                  <h3>Keep Current</h3>
                  <p>Helix learns what is important in your lab and can alert you to new journal articles so you can stay current in your discipline.</p>
                </div>
              </div>
              <div className="row text-center">
                <div className="col-md-4 col-md-offset-2 col-sm-6 item">
                  <img src={require('../../images/hands-free.png')} />
                  <h3>Increase Reproducibility</h3>
                  <p>Helix is a hands free, convenient way to access information, reducing chances of human error and increasing efficiency in experiments.</p>
                </div>

                <div className="col-md-4 col-sm-6 item">
                  <img src={require('../../images/inventory.png')} />
                  <h3>Manage Inventory</h3>
                  <p>Helix can access your inventory, making it easier for you to find the things you need while also keeping your inventory up to date.</p>
                </div>
              </div>

            </div>
          </section>
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'features'}>
          <div id="features">
            <section className="background">
              <div className="feature">
                <div className="heading text-center">
                  <h2>Let's Talk about Features!</h2>
                </div>
                <div className="item feature-left">
                  <div className="feature-image">
                    <img src={require('../../images/feature-reference.png')} />
                  </div>
                  <div className="feature-copy">
                    <h4>Ask Helix for scientific reference information </h4>
                    <p>Helix knows a lot about science! </p>
                    <div className="desktop-only">
                      <p>Let Helix act as your lab's voice activated search engine, taking your queries and requests and relaying the information back to you. Want to know the boiling point of benzene? What about the cut site for the restriction enzyme EcoRI? Just ask.</p>
                      <p>Plus, Helix is constantly learning! Helix already has an extensive knowledge base full of scientific reference information. Whenever Helix is asked for something that is not available in this knowledge base, it can search the internet for the answer. Once found, Helix can then "remember" that information by storing it in it's knowledge base. The more questions you ask Helix, the smarter it gets!</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="background-alt">
              <div className="feature">
                <div className="item feature-right">
                  <div className="feature-image">
                    <img src={require('../../images/feature-protocols.png')} />
                  </div>
                  <div className="feature-copy">
                    <h4>Helix can provide recipes and walk you through protocols</h4>
                    <p>Helix can be your voice-activated protocols notebook!</p>
                    <div className="desktop-only">
                      <p>Helix's knowledge base already contained a vast number of protocols and solution recipes that can be accessed by a simple voice request. Scientists can also add their own custom protocols and recipes to the knowledge base, controlling whether this information is available to the public or to only their lab. This information can then be accessed by simple voice prompts.</p>
                      <p>Helix also has the ability to walk you through a protocol in a stepwise fashion. Just ask Helix to pull up your protocol and it'll start with step one!</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="background">
              <div className="feature">
                <div className="item feature-left">
                  <div className="feature-image">
                    <img src={require('../../images/feature-inventory.png')} />
                  </div>
                  <div className="feature-copy">
                    <h4>Helix can help you manage your lab inventory</h4>
                    <p>Helix can help you find your stuff!!</p>
                    <div className="desktop-only">
                      <p>Labs have lots of items - chemicals, reagents, glassware, equipment, etc., and just trying to keep track of everything can be overwhelming.</p>
                      <p>Let Helix handle it! Helix can help you manage all of your lab materials so you always know what you have on hand. Simply ask Helix where you can find the things you're looking for, and Helix can give you the location!</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="background-alt">
              <div className="feature more">
                <div className="item feature-right">
                  <div className="feature-image">
                    <img src={require('../../images/feature-more.png')} />
                  </div>
                  <div className="feature-copy">
                    <h4>And More…</h4>
                    <ul className="more-features">
                      <li>Scientific Reference Data</li>
                      <li>Protocols and Recipes</li>
                      <li>"Lab Math" and Calculations</li>
                      <li>Journal Article Titles and Abstracts</li>
                      <li>Set Time-based Reminders</li>
                      <li>Page a co-worker for Assistance</li>
                      <li>Ask to get a Quote</li>
                      <li>Record a note</li>
                      <li>Integrates with the Echo Show</li>
                      <li>Add Custom Content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'using'}>
          <div>
            <section id="utterances">
            <div className="container">
              <div className="row text-center">
                <div className="heading">
                  <h2>Here are some examples of things you can ask Helix!</h2>
                </div>
              </div>
              <div className="row text-center utterance-example-wrapper">
                <div className="col-md-4 col-sm-6 item utterance-example">
                  <p>"What's the solubility of sodium hydroxide?"</p>
                </div>

                <div className="col-md-4 col-sm-6 item utterance-example">
                  <p>"What's the recipe for Coomassie Destain Solution?"</p>
                </div>

                <div className="col-md-4 col-sm-6 item utterance-example">
                  <p>"What's the protocol for a Phenol Chloroform DNA Extraction?"</p>
                </div>
              </div>
              <div className="row text-center utterance-example-wrapper">
                <div className="col-md-4 col-sm-6 item utterance-example">
                  <p>"Where can I find our AatII enzyme?"</p>
                </div>

                <div className="col-md-4 col-sm-6 item utterance-example">
                  <p>"What's new in Lyme disease research today?"</p>
                </div>

                <div className="col-md-4 col-sm-6 item utterance-example">
                  <p>"How do you make a 2M hydrochloric acid solution?"</p>
                </div>
              </div>
            </div>
          </section>
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'press-section'}>
          <div>
            <section id="press">
              <div className="container">
                <div className="row text-center">
                  <div className="heading">
                    <h2>Helix Has Researchers Talking!</h2>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-md-6 col-sm-6 item text-center">
                    <p className="quote">"[Helix] wants to transform Amazon's personal assistant Alexa into a tool for scientists."</p>
                    <p className="source">- <a href="http://cen.acs.org/articles/95/i19/Meet-your-new-lab-assistant.html" target="_blank">Chemical & Engineering News</a></p>
                    <a href="http://cen.acs.org/articles/95/i19/Meet-your-new-lab-assistant.html" target="_blank"><img src={require('../../images/cnen-logo.png')} /></a>
                  </div>
                  <div className="col-md-6 col-sm-6 item text-center">
                    <p className="quote">"Scientists Are Turning Alexa into an Automated Lab Helper"</p>
                    <p className="source">- <a href="https://www.technologyreview.com/s/604322/scientists-are-turning-alexa-into-an-automated-lab-helper/" target="_blank">MIT Technology Review</a></p>
                    <a href="https://www.technologyreview.com/s/604322/scientists-are-turning-alexa-into-an-automated-lab-helper/" target="_blank"><img src={require('../../images/mit-review-logo.png')} /></a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'start'}>
          <div>
            <SignUpForm
              signUp={this.state.signUp}
              onSignUp={this.onSignUp}
              onChange={this.updateSignUpState}
              saving={this.state.saving}
              errors={this.state.errors}
            />
          </div>
        </ScrollableAnchor>
      </div>
    );
  }
}
HomePage.propTypes = {
  signUp: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  let signUp = {
    full_name: '',
    email_address: '',
    message: '',
    show_success: false
  };
  return {
    signUp: signUp
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(signUpActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
