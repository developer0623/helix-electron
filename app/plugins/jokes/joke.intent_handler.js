import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

const jokes = [
  'Did you hear about the argument between sodium and dihydrogen monoxide?<break time="2.0s" />It was explosive.'
];
class JokeIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.JOKE, contextTypes.JOKE, slots);
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Joke IntentHandler] Getting Response Prompt`);

      const prompt = jokes[0];

      const response = new IntentResponse();

      response.response_type = "Prompt";
      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;

      return resolve(response);
    });
  }
};

export default JokeIntentHandler;
