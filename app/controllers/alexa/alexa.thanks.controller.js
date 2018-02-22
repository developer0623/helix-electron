import ThanksIntentHandler from '../../plugins/thanks.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const AlexaThanksController = {
  GetThanksResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentHandler = new ThanksIntentHandler(req.application, req.user, userId, []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "ThanksIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaThanksController;
