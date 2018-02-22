import { Application } from '../app/models';

const ApplicationFactory = {
  createApplication: (external_reference_id, owner, options) => {
    const application = new Application();

    application.external_reference_id = external_reference_id;
    application.name = options.name || "Application 1";
    application.application_type = "Custom";
    application.invocation_name = options.invocation_name || "Helix";
    application.summary = options.summary || "test";
    application.description = options.description || "test";
    application.category = "ORGANIZERS_AND_ASSISTANTS";
    application.platform_amazon = options.platform_amazon ||true;
    application.platform_google = options.platform_google ||false;
    application.owner = owner;
    application.default_launch_prompt = options.default_launch_prompt || "What can I help you with";
    application.default_launch_reprompt = options.default_launch_reprompt;

    return  application.save();
  }
}

module.exports = ApplicationFactory;
