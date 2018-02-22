import * as propertyTypes from '../models/types/propertyTypes';
import * as intentTypes from '../models/types/intentTypes';
import * as contextStatusTypes from '../models/types/userContextStatusTypes';
import * as contextTypes from '../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from './intent_base.manager';
import IntentResponse from '../managers/intent_response';

class PageIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.PAGE, contextTypes.PAGE, slots);

    this.slotDefinitions.push({
      key: "Name",
      required: true,
      missingPrompt: "Who do you want to page?",
      missingReprompt: "Say the name of your lab member.",
      invalidPrompt: "Hmm, I\'m not sure who to page. Say the name again?",
      invalidReprompt: "Try again."
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Page IntentHandler] Getting Response Prompt`);

      const prompt = `Ok, I sent a text message to James`; //${this.lab_member.name}`;
      const response = new IntentResponse();

      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = null;

      return resolve(response);
    });
  }
};

export default PageIntentHandler;
