import ProtocolStepIntentHandler from './protocol_step.intent_handler';

import * as intentTypes from '../../models/types/intentTypes';
import * as contextTypes from '../../models/types/contextTypes';
import * as entityTypes from '../../models/types/entityTypes';

class LaunchIntentHandler extends ProtocolStepIntentHandler {
  constructor(application, user, userId, slots) {
    super(application, user, userId, slots, "RepeatStep");
  }
  getPrompt() {
    console.log(`[Protocol Launch IntentHandler] Getting Response Prompt`);

    const prompt = `Hi, it looks like we were on step ${this.stepIndex + 1} of a ${this.entity.name} protocol.  Ask for the next step when you are ready.`;

    return prompt;
  }
};

export default LaunchIntentHandler;
