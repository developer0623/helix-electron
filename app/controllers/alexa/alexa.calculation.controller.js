import CalculatorIntentHandler  from '../../plugins/calculators/calculator.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const AlexaCalculationController = {
  GetCalculationResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentHandler = new CalculatorIntentHandler(req.application, req.user, userId, []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "CalculationIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaCalculationController;
