import VideoIntentHandler  from '../../plugins/video/video.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

const AlexaVideoController = {
  GetPlaybackResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const slots = [];
      slots.push({
        key: "Tag",
        value: getSlotValue(req.slots, "Tag")
      });
      const intentName = "PlayVideoIntent";
      const intentHandler = new VideoIntentHandler(req.application, req.user, userId, []);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "PlayVideoIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaVideoController;
