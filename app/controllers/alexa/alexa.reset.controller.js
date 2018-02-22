import ResetIntentHandler  from '../../plugins/reset.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const AlexaResetController = {
  GetResetIntentResponse: (req, res) => {
    const userId = req.data.session.user.userId;
    const intentHandler = new ResetIntentHandler(req.application, req.user, userId, []);

    intentHandler.fulfillIntent((err, response) => {
      if(err) { return reject(err); }

      response.intentName = "ResetContextIntent";
      const alexaResponseHandler = new AlexaResponseHandler(response);

      resolve(alexaResponseHandler.handleResponse(req, res));
    });
  }
}

module.exports = AlexaResetController;
