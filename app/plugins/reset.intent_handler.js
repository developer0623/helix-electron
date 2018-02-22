import * as propertyTypes from '../models/types/propertyTypes';
import * as intentTypes from '../models/types/intentTypes';
import * as contextStatusTypes from '../models/types/userContextStatusTypes';
import * as contextTypes from '../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from './intent_base.manager';
import IntentResponse from '../managers/intent_response';

class ResetIntentHandler extends IntentBaseManager {
  constructor(application, user, slots) {
    super(application, user, intentTypes.RESET, null, slots);
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Reset IntentHandler] Getting Response Prompt`);

      const prompt = "Ok";

      const response = new IntentResponse();

      response.response_type = "Prompt";
      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = null;

      return resolve(response);
    });
  }
  saveContext() {
    return new Promise((resolve, reject) => {
      this.context.time_to_expire = Date.now();
      this.context.status = contextStatusTypes.COMPLETED;

      super.saveContext()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
};

export default ResetIntentHandler;
