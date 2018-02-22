import * as propertyTypes from '../models/types/propertyTypes';
import * as intentTypes from '../models/types/intentTypes';
import * as contextStatusTypes from '../models/types/userContextStatusTypes';
import * as contextTypes from '../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';
import random from 'random-number';

import IntentBaseManager from './intent_base.manager';
import IntentResponse from '../managers/intent_response';

class LaunchIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.LAUNCH, contextTypes.LAUNCH, slots);
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Launch IntentHandler] Getting Response Prompt`);

      const response = new IntentResponse();

      response.response_type = "Prompt";
      response.prompt = this.application.default_launch_prompt;
      response.reprompt = this.application.default_launch_reprompt;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = null;

      return resolve(response);
    });
  }
};

export default LaunchIntentHandler;
