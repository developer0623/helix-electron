import StopIntentHandler  from '../../plugins/stop.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const AlexaStopController = {
  GetStopResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentHandler = new StopIntentHandler(req.application, req.user, userId, []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "Alexa.StopIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaStopController;
