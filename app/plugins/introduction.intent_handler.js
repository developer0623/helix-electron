import * as propertyTypes from '../models/types/propertyTypes';
import * as intentTypes from '../models/types/intentTypes';
import * as contextStatusTypes from '../models/types/userContextStatusTypes';
import * as contextTypes from '../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from './intent_base.manager';
import IntentResponse from '../managers/intent_response';

class HelpIntentHandler extends IntentBaseManager {
  constructor(application, user, slots) {
    super(application, user, intentTypes.INTRODUCTION, contextTypes.INTRODUCTION, slots);
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Introduction IntentHandler] Getting Response Prompt`);

      let prompt = 'Hi, I\'m Helix.'
      prompt += ' I\'m a voice activated virtual assistant for the laboratory sciences'

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

export default HelpIntentHandler;
