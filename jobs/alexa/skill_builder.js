import _ from 'lodash';
import async from 'async';
import Application from '../../app/models/application';
import Company from '../../app/models/company';
import Intent from '../../app/models/intent';
import Lab from '../../app/models/lab';
import Repository from '../../app/models/repository';
import RepositoryType from '../../app/models/repository_type';
import System from '../../app/models/system';
import SkillManifestBuilder from './skill_manifest_builder';
import InteractionModelBuilder from './interaction_model_builder';
import AlexaApi from './alexa_api';

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
const AlexaSkillBuilder = {
  buildSkill: (application_id) => {
    return new Promise((resolve, reject) => {
      let application;
      let company;
      let repositories;
      let skillManifest;

      Application.findById(application_id)
      .populate({
        path: 'owner',
        model: 'Company',
      })
      .then((results) => {
        application = results;
        company = application.owner;

        if(!application) { return reject(new Error(`Application ${application_id} Not Found`)); }
        if(!company) { return rejet(new Error(`Company for Application ${application.company} Not Found`)); }
        if(!company.amazon_oauth_token) { return reject(new Error(`Company ${application.company.name} missing Amazon OAuth Tokens`)); }

        return Repository.find({
          owner: company._id
        })
        .populate({
          path: 'repository_type',
          model: 'RepositoryType',
          populate: {
            path: 'intents',
              model: 'Intent',
              populate: {
                path: 'slots.custom_slot_type',
                model: 'CustomSlotType'
            }
          }
        });
      })
      .then((results) => {
        repositories = results;

        return SkillManifestBuilder.buildJSON(application, repositories);
      })
      .then((results) => {
        skillManifest = results;

        console.log(JSON.stringify(skillManifest));

        return getToken(company)
      })
      .then((token) => {
        if(!_.isNil(application.external_reference_id)) {
          AlexaApi.updateSkillManifest(token.access_token, application.external_reference_id, skillManifest)
          .then((updatedSkillManifest) => {
            InteractionModelBuilder.buildJSON(application, repositories)
            .then((interactionModel) => {
              console.log("****** INTERACTION MODEL *******");

              console.log(JSON.stringify(interactionModel));

              const languages = _.find(application.languages, { platform: "Amazon" });

              if(!languages) { return reject(new Error("No Languages Found")); }
              if(_.isEmpty(languages.enabled_languages)) { return reject(new Error("No Languages Found")); }

              async.each(languages.enabled_languages, (enabled_language, callback) => {
                AlexaApi.updateInteractionModel(token.access_token, application.external_reference_id, interactionModel, enabled_language.locale)
                .then(() => {
                  callback();
                })
                .catch((err) => {
                  callback(err);
                });
              }, (err) => {
                if(err) { return reject(err); }

                resolve();
              });
            })
            .catch((err) => {
              reject(err);
            });
          })
          .catch((err) => {
            reject(err);
          });
        } else {
          AlexaApi.createSkillManifest(token.access_token, skillManifest)
          .then((response) => {
            application.external_reference_id = response.skillId;
            application.save()
            .then(() => {
              InteractionModelBuilder.buildJSON(application)
              .then((interactionModel) => {
                if(!languages) { return reject(new Error("No Languages Found")); }
                if(_.isEmpty(languages.enabled_languages)) { return reject(new Error("No Languages Found")); }

                async.each(languages.enabled_languages, (enabled_language, callback) => {
                  AlexaApi.updateInteractionModel(token.access_token, application.external_reference_id, interactionModel, enabled_language.locale)
                  .then(() => {
                    callback();
                  })
                  .catch((err) => {
                    callback(err);
                  });
                }, (err) => {
                  if(err) { return reject(err); }

                  resolve();
                });
              })
              .catch((err) => {
                reject(err);
              });
            })
            .catch((err) => {
              reject(err);
            });
          })
          .catch((err) => {
            reject(err);
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = AlexaSkillBuilder;
