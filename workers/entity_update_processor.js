import Application from '../app/models/application';
import Company from '../app/models/company';
import Entity from '../app/models/entity';
import Repository from '../app/models/repository';

import async from 'async';

const EntityUpdateProcessor = {
  process: (data) => {
    return new Promise((resolve, reject) => {
      const entityId = data.entity_id;

      if(!entityId) { return reject(new Error("Entity Id Not Specified")); }

      Entity.findById(entityId)
      .then((entity) => {
        return Repository.findById(entity.repository)
      })
      .then((repository) => {
        return Company.findById(repository.owner);
      })
      .then((company) => {
        return Application.find({ owner: company._id })
      })
      .then((applications) => {
        async.each(applications, (application, callback) => {
          application.amazon_deployment_attributes.needs_build = true;

          application.save()
          .then(() => {
            callback();
          })
          .catch((err) => {
            callback();
          })
        }, (err) => {
          if(err) { reject(err); }

          resolve();
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = EntityUpdateProcessor;
