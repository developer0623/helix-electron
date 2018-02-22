import { expect } from 'chai';
import { Application } from '../models';

describe('Application', () => {
  it('should default needs private distribution to be false', (done) => {
    const application = new Application();

    expect(application.amazon_deployment_attributes.needs_private_distribution).to.be.false;

    done();
  });
  it('should default needs build to be false', (done) => {
    const application = new Application();

    expect(application.amazon_deployment_attributes.needs_build).to.be.false;

    done();
  });
  it('should default needs certification to be false', (done) => {
    const application = new Application();

    expect(application.amazon_deployment_attributes.needs_certification).to.be.false;

    done();
  });
  it('should default locked to be false', (done) => {
    const application = new Application();

    expect(application.amazon_deployment_attributes.locked).to.be.false;

    done();
  });
  it('should be invalid if name is empty', (done) => {
    const application = new Application();

    application.validate()
    .catch((err) => {
      expect(err.errors.name).to.exist;

      done();
    });
  });
  it('should be invalid if application type is empty', (done) => {
    const application = new Application();

    application.validate()
    .catch((err) => {
      expect(err.errors.application_type).to.exist;

      done();
    });
  });
  it('should be invalid if invocation name is empty', (done) => {
    const application = new Application();

    application.validate()
    .catch((err) => {
      expect(err.errors.invocation_name).to.exist;

      done();
    });
  });
  it('should be invalid if summary is empty', (done) => {
    const application = new Application();

    application.validate()
    .catch((err) => {
      expect(err.errors.summary).to.exist;

      done();
    });
  });
  it('should be invalid if description is empty', (done) => {
    const application = new Application();

    application.validate()
    .catch((err) => {
      expect(err.errors.description).to.exist;

      done();
    });
  });
  it('should be invalid if category is empty', (done) => {
    const application = new Application();

    application.validate()
    .catch((err) => {
      expect(err.errors.category).to.exist;

      done();
    });
  });
  it('should default platform amazon to be true', (done) => {
    const application = new Application();

    expect(application.platform_amazon).to.be.true;

    done();
  });
  it('should default platform google to be false', (done) => {
    const application = new Application();

    console.log(application.platform_google)
    expect(application.platform_google).to.be.false;

    done();
  });
  it('should default Alexa Audio Player directive to be true', (done) => {
    const application = new Application();

    expect(application.alexa_directives.audio_player_directives).to.be.true;

    done();
  });
  it('should default Alexa Video Player directive to be true', (done) => {
    const application = new Application();

    expect(application.alexa_directives.video_app_directives).to.be.true;

    done();
  });
  it('should default Alexa Render Template directive to be true', (done) => {
    const application = new Application();

    expect(application.alexa_directives.render_template_directives).to.be.true;

    done();
  });
  it('should default distribution to be all_countries', (done) => {
    const application = new Application();

    expect(application.distribution).to.equal('all_countries');

    done();
  });
  it('should default distribution mode to be PUBLIC', (done) => {
    const application = new Application();

    expect(application.distribution_mode).to.equal('PUBLIC');

    done();
  });
  it('should default default launch prompt', (done) => {
    const application = new Application();

    expect(application.default_launch_prompt).to.equal('What can I help you with?');

    done();
  });
  it('should default active to true', (done) => {
    const application = new Application();

    expect(application.active).to.be.true;

    done();
  });
  it('should default default owner_type to Company', (done) => {
    const application = new Application();

    expect(application.owner_type).to.equal('Company');

    done();
  });
  it('should be invalid if company is empty', (done) => {
    const application = new Application();

    application.validate()
    .catch((err) => {
      expect(err.errors.owner).to.exist;

      done();
    });
  });
});
