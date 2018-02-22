import Application from '../app/models/application';
import Entity from '../app/models/entity';
import Repository from '../app/models/repository';

const ApplicationUpdateProcessor = {
  process: (data) => {
    return new Promise((resolve, reject) => {
      const applicationId = data.application_id;

      if(!applicationId) { return reject(new Error("Application Id Not Specified")); }

      Application.findById(applicationId)
      .then((application) => {
        application.amazon_deployment_attributes.needs_build = true;

        application.save()
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = ApplicationUpdateProcessor;
