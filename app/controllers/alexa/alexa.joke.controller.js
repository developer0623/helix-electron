import JokeIntentHandler  from '../../plugins/jokes/joke.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const AlexaJokeController = {
  GetJokeResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentHandler = new JokeIntentHandler(req.application, req.user, userId, []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "JokeIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaJokeController;
