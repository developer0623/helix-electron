import CancelIntentHandler  from '../../plugins/cancel.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const AlexaCancelController = {
  GetCancelResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentHandler = new CancelIntentHandler(req.application, req.user, userId, []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "Amazon.Cancel";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaCancelController;
