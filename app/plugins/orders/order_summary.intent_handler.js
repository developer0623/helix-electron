import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class OrderSummaryIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.ORDERSUMMARY, contextTypes.ORDER, slots);
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Order Summary IntentHandler] Getting Response Prompt`);

      const prompt = `You’ve added the following items to your order request: Acetic Anhydride and Para-aminophenol.`

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

export default OrderSummaryIntentHandler;
