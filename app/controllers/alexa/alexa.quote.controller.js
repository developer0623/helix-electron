import QuoteIntentHandler  from '../../plugins/quote/quote.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const AlexaQuoteController = {
  GetRequestQuoteResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentHandler = new QuoteIntentHandler(req.application, req.user, userId, []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "QuoteIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaQuoteController;
