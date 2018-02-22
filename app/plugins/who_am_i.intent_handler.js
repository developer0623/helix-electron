import * as propertyTypes from '../models/types/propertyTypes';
import * as intentTypes from '../models/types/intentTypes';
import * as contextStatusTypes from '../models/types/userContextStatusTypes';
import * as contextTypes from '../models/types/contextTypes';

import { Lab } from '../models';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from './intent_base.manager';
import IntentResponse from '../managers/intent_response';

class WhoAmIIntentHandler extends IntentBaseManager {
  constructor(application, user, slots) {
    super(application, user, intentTypes.WHOAMI, null, slots);
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Who Am I] Getting Response Prompt`);

      Lab.findOne({
        company: this.application.company
      })
      .then((lab) => {
        if(lab) {
          const prompt = `This device is setup for the ${lab.lab_name}`;

          const response = new IntentResponse();

          response.response_type = "Prompt";
          response.prompt = prompt;
          response.reprompt = null;
          response.slotName = null;
          response.clearIntent = false;
          response.hintText = "Anything else?";

          return resolve(response);
        } else {
          const prompt = 'Sorry, I don\'t know.  You\'re lab is not setup'

          const response = new IntentResponse();

          response.response_type = "Prompt";
          response.prompt = prompt;
          response.reprompt = null;
          response.slotName = null;
          response.clearIntent = false;
          response.hintText = "Anything else?";

          return resolve(response);
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
};

export default WhoAmIIntentHandler;
