import Entity from '../../models/entity';
import UserContext from '../../models/user_context';

import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';
import * as entityTypes from '../../models/types/entityTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class CompleteProtocolIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.PROTOCOL, contextTypes.COMPLETEPROTOCOL, slots);
  }
  execute() {
    return new Promise((resolve, reject) => {
      if(this.context) {
        this.context.time_to_expire = Date.now();
        this.context.status = contextStatusTypes.COMPLETED;
      }

      resolve();
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Complete Protocol IntentHandler] Getting Response Prompt`);

      const prompt = 'Ok. I marked this protocol complete.'

      const response = new IntentResponse();

      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;

      return resolve(response);
    });
  }
};

export default CompleteProtocolIntentHandler;
