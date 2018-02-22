import Application from '../app/models/application';
import Company from '../app/models/company';
import Entity from '../app/models/entity';
import Repository from '../app/models/repository';

import async from 'async';

import AlexaApi from '../jobs/alexa/alexa_api';

const BUILD_STATUS_SUCCCESS = "SUCCESS";
const BUILD_STATUS_FAILED = "FAILED";
const BUILD_STATUS_IN_PROGRESS = "IN_PROGRESS";

function getToken(company) {
  return new Promise((resolve, reject) => {
    const oauth_tokens = company.amazon_oauth_token;

    if(!oauth_tokens) {
      reject(new Error(`Amazon Oauth Tokens Not Found for Company ${company._id}`));
    } else {
      const refresh_token = oauth_tokens.refresh_token;

      AlexaApi.refreshToken(refresh_token)
      .then((token) => {
        resolve(token);
      })
      .catch((err) => {
        reject(err);
      });
    }
  })
  .catch((err) => {
    reject(err);
  });
}
const ApplicationBuildStatusProcessor = {
  process: () => {
    return new Promise((resolve, reject) => {
      Application.find({
        locked: true
      })
      .then((applications) => {
        async.each(applications, (application, callback) => {
          Company.findById(application.owner)
          .then((company) => {
            return getToken(company);
          })
          .then((access_token) => {
            const languages = _.find(application.languages, { platform: "Amazon" });

            async.each(languages.enabled_languages, (language, callback) => {
              AlexaApi.getInteractionModelBuildStatus(access_token, language.locale, application.external_reference_id)
              .then((results) => {
                switch(results.status) {
                  case BUILD_STATUS_SUCCCESS:
                    application.amazon_deployment_attributes.locked = false;
                    application.amazon_deployment_attributes.last_build_status = BUILD_STATUS_SUCCCESS;

                    break;
                  case BUILD_STATUS_FAILED:
                    application.amazon_deployment_attributes.locked = false;
                    application.amazon_deployment_attributes.last_build_status = BUILD_STATUS_FAILED;

                    break;
                  case BUILD_STATUS_IN_PROGRESS:
                    application.amazon_deployment_attributes.locked = false;
                    application.amazon_deployment_attributes.last_build_status = BUILD_STATUS_IN_PROGRESS;

                    break;
                }
                return application.save();
              })
              .then(() => {
                callback();
              })
              .catch((err) => {
                callback(err);
              })
            }, (err) => {
              if(err) { callback(err); }

              callback();
            })
          })
          .catch((err) => {
            if(err) { callback(err); }

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

module.exports = ApplicationBuildStatusProcessor;
