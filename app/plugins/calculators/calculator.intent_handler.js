import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class CalculatorIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.CALCULATION, contextTypes.CALCULATION, slots);

    this.slotDefinitions.push({
      key: "CalculationName",
      required: true,
      missingPrompt: "What type of calculation?",
      missingReprompt: "Say the type of calculation.",
      invalidPrompt: "I'm sorry.  Can you try again?",
      invalidReprompt: "Try again."
    });
    this.slotDefinitions.push({
      key: "CalculationType",
      required: false,
      missingPrompt: "What type of calculation?",
      missingReprompt: "Say the type of calculation.",
      invalidPrompt: "I'm sorry.  Can you try again?",
      invalidReprompt: "Try again."
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Calculation IntentHandler] Getting Response Prompt`);

      const prompt = `Ok, I'll give that a try.`;

      const response = new IntentResponse();
      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.shouldEndSession = true;

      return resolve(response);
    });
  }
};

export default CalculatorIntentHandler;
