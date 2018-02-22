import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class VideoIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.VIDEO, contextTypes.VIDEO, slots);

    this.slotDefinitions.push({
      key: "Tag",
      required: false
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Video IntentHandler] Getting Response Prompt`);

      const response = new IntentResponse();

      response.response_type = "Prompt";
      response.prompt = "Playing Video";
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = null;
      response.video = {
        url: "https://s3.amazonaws.com/helix-io-dev/videos/Overview+of+New+England+Biolabs.mp4",
        title: "New England BioLabs",
        subtitle: "Overview"
      }

      return resolve(response);
    });
  }
};

export default VideoIntentHandler;
