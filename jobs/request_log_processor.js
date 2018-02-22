import RequestLog from '../app/models/request_log';

import * as intentTypes from '../app/models/types/intentTypes';

function logRequest(intent, requestProperties, prompt, resolved) {
  return new Promise((resolve, reject) => {
    const requestLog = new RequestLog();

    requestLog.intent = intent;
    requestLog.request = requestProperties;
    requestLog.prompt = prompt;
    requestLog.resolved = resolved;

    requestLog.save()
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  });
}
const RequestLogProcessor = {
  processRequest: (intent, request, prompt, resolved) => {
    return new Promise((resolve, reject) => {
      CustomSlot.incrementCount(request.property)
      .then(() => {
        return CustomSlot.incrementCount(request.entity)
      })
      .then(() => {
        const requestProperties = {
          property: request.property,
          resolved_property: request.resolved_property,
          entity: request.entity,
          resolved_entity: request.resolved_entity,
          property_value: request.property_value
        }
        return logRequest(intent, requestProperties, prompt, resolved)
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

module.exports = RequestLogProcessor;
