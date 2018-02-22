import WhoAmIIntentHandler  from '../../plugins/who_am_i.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const AlexaWhoAmIController = {
  GetWhoAmIResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentHandler = new WhoAmIIntentHandler(req.application, req.user, userId, []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "WhoAmIIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaWhoAmIController;
