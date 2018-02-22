import Entity from '../../models/entity';
import UserContext from '../../models/user_context';

import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';
import * as entityTypes from '../../models/types/entityTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

const FIRST_STEP = "FirstStep";
const NEXT_STEP = "NextStep";
const PREVIOUS_STEP = "PreviousStep";
const REPEAT_STEP = "RepeatStep";

class ProtocolStepIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots, stepFunction) {
    super(application, user, userId, intentTypes.PROTOCOLSTEP, contextTypes.PROTOCOL, slots);

    this.stepFunction = stepFunction;
    this.stepIndex;
  }
  getContext() {
    return new Promise((resolve, reject) => {
      console.log(`[Protocol Step IntentHandler] Get Context`);

      super.getContext()
      .then(() => {
        if(this.context && this.context.context && this.context.context.entityName) {
          this.entityName = this.context.context.entityName

          switch(this.stepFunction) {
            case NEXT_STEP:
              this.stepIndex = this.context.context.step + 1 || 0;

              break;
            case PREVIOUS_STEP:
              this.stepIndex = this.context.context.step - 1 || 0;

              break;
            case REPEAT_STEP:
              this.stepIndex = this.context.context.step || 0;

              break;
            case FIRST_STEP:
              this.stepIndex = 0;

              break;
            default:
              reject(new Error("Unhandled Step Function ${this.stepFunction}"))
          }

          resolve();
        } else {
          reject(new Error("Protocol not found."));
        }
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[Protocol Step IntentHandler] Validating Slots`);

      resolve();
    });
  }
  validateEntity() {
    return new Promise((resolve, reject) => {
      console.log(`[Protocol Step IntentHandler] Validating Entities`);

      Entity.findOne({
        name_lower: `${this.entityName.toLowerCase()}`,
        owner: `${this.application.owner}`
      })
      .then((entity) => {
        if(entity) {
          this.entity = entity;

          resolve();
        } else {
          const response = new IntentResponse();
          const prompt = "I'm not sure about that protocol.  Can you say the name again?";
          const reprompt = "Say the protocol name again.";

          response.response_type = "Prompt";
          response.prompt = prompt;
          response.reprompt = reprompt;
          response.slotName = null;
          response.clearIntent = false;

          resolve(response);
        }
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
  getPrompt() {
    console.log(`[Protocol Step IntentHandler] Getting Response Prompt for ${this.stepIndex}`);

    let startPhrase;
    switch(this.stepFunction) {
      case NEXT_STEP:
        startPhrase = `Next, <break time="0.5s" />`;

        break;
      case PREVIOUS_STEP:
        startPhrase = `The previous step is <break time="0.5s" />`;

        break;
      case REPEAT_STEP:
        startPhrase = "";

        break;
      case FIRST_STEP:
        startPhrase = `The first step is <break time="0.5s" />`;

        break;
      default:

    }
    const step = this.entity.attributes.steps[this.stepIndex];
    const prompt = `${startPhrase}${(step.say_as) ? step.say_as : step.name }`;

    return prompt;
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Protocol Step IntentHandler] Getting Response Prompt`);

      let prompt;
      let reprompt;
      const response = new IntentResponse();

      if(this.entity.attributes.steps && this.stepIndex < this.entity.attributes.steps.length) {
        prompt = this.getPrompt();

        const step = this.entity.attributes.steps[this.stepIndex];

        const bodyTemplate = {
          token: this.entity._id,
          title: this.entity.name,
          primary_text: `Step ${this.stepIndex + 1} of ${this.entity.attributes.steps.length}`,
          secondary_text: step.name
        }
        response.bodyTemplate = bodyTemplate;
        response.hintText = "What's the next step?";
      } else {
        prompt = 'It looks like we\'ve completed all the steps.  I can back up a step if you need, just ask me for the previous step.';

        response.hintText = "What's the previous step?";
      }
      response.prompt = prompt;
      response.reprompt = reprompt;
      response.slotName = null;
      response.clearIntent = false;

      return resolve(response);
    });
  }
  saveContext() {
    return new Promise((resolve, reject) => {
      if(this.context.context) {
        this.context.context.step = this.stepIndex;
      }
      super.saveContext()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
};

export default ProtocolStepIntentHandler;
