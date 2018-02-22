import Application from '../app/models/application';
import Entity from '../app/models/entity';
import Repository from '../app/models/repository';

import PublishManager from '../app/managers/publish_manager';

import AlexaSkillBuilder from '../jobs/alexa/skill_builder';

import config from '../src/config';
import connections from '../src/connection';
import queues from '../lib/queues';
import async from 'async';

let itemsProcessed = 0;

function sendSlackJobMessage(message, cb) {
  PublishManager.queueMessage({
    channel: "#devops",
    username: "HelixBot",
    message: message
  }, queues.SLACK_QUEUE,
  cb);
}
const SkillBuilder = {
  process: () => {
    return new Promise((resolve, reject) => {
      const errors = [];

      Application.find({
        amazon_deployment_attributes: {
          needs_build: true,
          locked: false
        }
      })
      .then((applications) => {
        async.each(applications, (application, callback) => {
          AlexaSkillBuilder.buildSkill(application._id)
          .then(() => {
            application.amazon_deployment_attributes.needs_build = false;
            application.amazon_deployment_attributes.locked = true;
            application.amazon_deployment_attributes.last_build_date = new Date();

            return application.save();
          })
          .then(() => {
            itemsProcessed += 1;

            callback();
          })
          .catch((err) => {
            errors.push({
              application: application,
              error: err
            });

            callback();
          });
        }, (err) => {
          if(errors.length > 0) { return reject(errors) }

          resolve();
        });

      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

const connector = connections.createConnection(config.mongo_url, config.rabbit_url);

connector.on('ready', () => {
  sendSlackJobMessage(`Job Started: Skill Builder`);

  SkillBuilder.process()
  .then(() => {
    sendSlackJobMessage(`Job Complete: Skill Builder: ${itemsProcessed} Items Processed `, () => {
      process.exit();
    });
  })
  .catch((err) => {
    sendSlackJobMessage(`Job Failed: Skill Builder: ${err}`, () => {
      process.exit();
    });
  });
});
