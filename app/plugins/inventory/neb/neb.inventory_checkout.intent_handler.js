import * as propertyTypes from '../../../models/types/propertyTypes';
import * as intentTypes from '../../../models/types/intentTypes';
import * as contextStatusTypes from '../../../models/types/userContextStatusTypes';
import * as contextTypes from '../../../models/types/contextTypes';

import _ from 'lodash';

import IntentBaseManager from '../../intent_base.manager';
import IntentResponse from '../../../managers/intent_response';

class NEBInventoryCheckoutIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.INVENTORYCHECKOUTSTATUS, contextTypes.INVENTORY, slots);
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[NEBInventoryCheckout IntentHandler] Getting Response Prompt`);

      const prompt = `Dave checked out <say-as interpret-as="characters">AAT2</say-as> at 3:00PM, August 31.`

      const response = new IntentResponse();

      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = null;

      resolve(response);
    });
  }
};

export default NEBInventoryCheckoutIntentHandler;
