import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class QuoteIntentHandler extends IntentBaseManager {
  constructor(application, user, slots) {
    super(application, user, intentTypes.QUOTE, contextTypes.QUOTE, slots);
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Quote IntentHandler] Getting Response Prompt`);

      const prompt = 'Ok, I\'ll get some quotes for that item.'

      const response = new IntentResponse();

      response.response_type = "Prompt";
      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = "Anything else?";

      return resolve(response);
    });
  }
};

export default QuoteIntentHandler;
