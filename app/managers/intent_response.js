class IntentResponse {
  constructor() {
    this.response_type = "";
    this.prompt = "";
    this.reprompt = "";
    this.confirmIntent = false;
    this.shouldEndSession = false;
    this.slotName = "";
    this.clearIntent = false;
    this.listTemplate;
    this.hintText = "";
    this.bodyTemplate;
    this.response;
    this.audio;
    this.video;
  }
}

export default IntentResponse;
