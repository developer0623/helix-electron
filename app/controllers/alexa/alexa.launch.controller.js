import LaunchIntentHandler  from '../../plugins/launch.intent_handler';
import ProtocolLaunchIntentHandler  from '../../plugins/protocol/launch.intent_handler';

import UserContext  from '../../models/user_context';

import AlexaProtocolController from './alexa.protocol.controller';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

const AlexaLaunchController = {
  GetLaunchResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      let intentHandler;

      UserContext.getLastInProgressContext(userId)
      .then((userContext) => {
        const contextType = (userContext) ? userContext.type : "";

        switch(contextType) {
          case "protocol":
            intentHandler = new ProtocolLaunchIntentHandler(req.application, req.user, userId, []);

            break;

          default:
            intentHandler = new LaunchIntentHandler(req.application, req.user, userId, []);
        }
        intentHandler.fulfillIntent((err, response) => {
          if(err) { return reject(err); }

          response.intentName = "LaunchRequest";
          const alexaResponseHandler = new AlexaResponseHandler(response);

          resolve(alexaResponseHandler.handleResponse(req, res));
        });
      })
    });
  }
}

module.exports = AlexaLaunchController;
