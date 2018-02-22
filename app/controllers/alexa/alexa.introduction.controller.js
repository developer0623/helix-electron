import IntroductionIntentHandler  from '../../plugins/introduction.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const AlexaIntroductionController = {
  GetIntroductionResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentHandler = new HelpIntentHandler(req.application, req.user, userId, []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "IntroductionIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaIntroductionController;
