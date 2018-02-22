import mongoose from 'mongoose';
import apiai from 'apiai';
import Entity from '../app/models/entity';
import config from '../src/config';
import _ from 'lodash';
import async from 'async';

const apiApp = config.apiAi_key;

function processProtocol(protocol) {
  return new Promise((resolve, reject) => {
    if(_.isEmpty(protocol.steps)) { resolve(protocol); }

    async.eachSeries(protocol.steps, (step, callback) => {
      processStep(step)
      .then((results) => {
        step.step_action = results;

        callback();
      })
      .catch((err) => {
        callback(err);
      })
    }, (err) => {
      if(err) { reject(err); }

      resolve(protocol);
    });
  });
}
function processStep(step) {
  return new Promise((resolve, reject) => {
    if(step) {
      splitStepActions(step)
      .then((splitActions) => {
        const actions = [];

        async.eachSeries(splitActions, (stepAction, callback) => {
          const request = apiApp.textRequest(stepAction, {
            sessionId: '12345'
          })
          .on('response', (response) => {
            if(response
              && response.result
              && response.result.parameters) {
              const params = response.result.parameters;

              const properties = [];

              if(!_.isEmpty(params["element-name"])) {
                properties.push({
                  key: "element",
                  value: params["element-name"][0]
                });
              }
              if(!_.isEmpty(params["element-quantity"])) {
                console.log(params["element-quantity"]);
                const param = params["element-quantity"][0];
                let value;

                if(param.amount
                  && param.unit) {
                  value = `${param.amount} ${param.unit}`;
                } else if(param.amount) {
                  value = `${param.amount}`;
                }
                if(value) {
                  properties.push({
                    key: "quantity",
                    value: value
                  });
                }
              }
              if(!_.isEmpty(params["element-temperature"])) {
                const param = params["element-temperature"][0]["temperature"];
                const value = `${param.amount}°${param.unit}`;

                properties.push({
                  key: "temperature",
                  value: value
                });
              }
              if(!_.isEmpty(params["step-duration"])) {
                properties.push({
                  key: "duration",
                  value: params["step-duration"][0]
                });
              }

              const action = {
                action_name: params["action-name"],
                element_name: params["element-name"],
                properties: properties
              };
              actions.push(action);

              callback();
            } else {
              callback();
            }
          })
          .on('error', (err) => {
            reject(err);
          });

          request.end();
        }, (err) => {
          if(err) { reject(err); }

          resolve(actions);
        });
      })
      .catch((err) => {
        reject(err);
      });
    } else {
      resolve(null);
    }
  });
}
function splitStepActions(step) {
  return new Promise((resolve, reject) => {
    const request = apiApp.textRequest(step.name, {
      sessionId: '12345'
    })
    .on('response', (response) => {
      if(response
        && response.result
        && response.result.parameters) {
        const stepName = step.name.toLowerCase();
        const actionNames = response.result.parameters["action-name"];
        const stepActionIndexes = [];

        _.forEach(actionNames, (actionName) => {
          const startIndex = stepName.indexOf(actionName);

          stepActionIndexes.push(startIndex);
        });
        let startIndex;
        let endIndex;
        const splitActions = [];
        let i;

        for(i=0; i<stepActionIndexes.length; i++) {
          if(!startIndex) {
            startIndex = stepActionIndexes[i];
          }
          if(i + 1 < stepActionIndexes.length) {
            endIndex = stepActionIndexes[i + 1];
          } else {
            endIndex = stepName.length  ;
          }

          splitActions.push(stepName.substring(startIndex, endIndex).trim());
          startIndex = endIndex;
        }

        resolve(splitActions)
      } else {
        resolve();
      }
    })
    .on('error', (err) => {
      reject(err);
    });

    request.end();
  });
}
let ActionParser = {
  parseProtocolSteps: function(protocolId) {
    return new Promise((resolve, reject) => {
      console.log(`Parsing steps for protocol ${protocolId}`);

      Entity.findById(protocolId)
      .then((protocol) => {
        if (!protocol) {
          reject("Protocol not found: "+  protocolId);
        } else {
          processProtocol(protocol)
          .then((protocol) => {
            protocol.parse_step_actions = false;

            return protocol.save();
          })
          .then(() => {
            resolve(protocol);
          })
          .catch((err) => {
            console.log(`${err}: ${err.stack}`);

            reject(err);
          });
        }
      })
      .catch((err) => {
        console.log(`${err}: ${err.stack}`);

        reject(err);
      });
    });
  }
}

module.exports = ActionParser;
