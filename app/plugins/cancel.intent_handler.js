import * as propertyTypes from '../models/types/propertyTypes';
import * as intentTypes from '../models/types/intentTypes';
import * as contextStatusTypes from '../models/types/userContextStatusTypes';
import * as contextTypes from '../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from './intent_base.manager';
import IntentResponse from '../managers/intent_response';

class CancelIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.CANCEL, null, slots);
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Cancel IntentHandler] Getting Response Prompt`);

      const prompt = 'Ok';

      const response = new IntentResponse();

      response.response_type = "Prompt";
      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = null;
      response.audio = {
        stop: true
      }

      return resolve(response);
    });
  }
};

export default CancelIntentHandler;
