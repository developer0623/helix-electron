import * as propertyTypes from '../models/types/propertyTypes';
import * as intentTypes from '../models/types/intentTypes';
import * as contextStatusTypes from '../models/types/userContextStatusTypes';
import * as contextTypes from '../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from './intent_base.manager';
import IntentResponse from '../managers/intent_response';

class ThanksIntentHandler extends IntentBaseManager {
  constructor(application, user, slots) {
    super(application, user, intentTypes.THANKS, contextTypes.THANKS, slots);
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Quote IntentHandler] Getting Response Prompt`);

      const prompt = 'You\'re welcome';

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
};

export default ThanksIntentHandler;
