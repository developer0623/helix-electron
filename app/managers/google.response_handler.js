// GoogleAbstractController.GetAbstractResponse(req, res)
// .then((response) => {
//   res.status(200).json(response);
// })
// .catch((err) => {
//   console.log(err);
//
//   res.status(500).json({error: err});
// });

const defaults = {
  intentName: "UnspecifiedIntent",
  prompt: null,
  reprompt: null,
  confirmIntent: false,
  shouldEndSession: false,
  elicitSlot: null,
  hintText: null,
  bodyTemplate: null,
  listTemplate: null,
  audio: null,
  video: null
}
class GoogleResponseHandler {
  constructor(options) {
    this.intentName = options.intentName || defaults.intentName;
    this.prompt = options.prompt || defaults.prompt;
    this.reprompt = options.reprompt || defaults.reprompt;
    this.confirmIntent = options.confirmIntent || defaults.confirmIntent;
    this.shouldEndSession = options.shouldEndSession || defaults.shouldEndSession;
    this.elicitSlot = options.elicitSlot || defaults.elicitSlot;
    this.hintText = options.hintText || defaults.hintText;
    this.bodyTemplate = options.bodyTemplate || defaults.bodyTemplate;
    this.listTemplate = options.listTemplate || defaults.listTemplate;
    this.audio = options.audio || defaults.audio;
    this.video = options.video || defaults.video;
  }
  handleResponse() {
    console.log(`[Google Response Handler] Formatting Response`);

    const supportsDisplay = false;

    const json = {
      "speech": prompt,
      "displayText": prompt,
      "source": "HelixAI"
    }

    return json;
  }
}

export default GoogleResponseHandler;
