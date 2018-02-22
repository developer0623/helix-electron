import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import StateIntentBaseManager from '../state_intent_base.intent_handler';
import IntentResponse from '../../managers/intent_response';


const stateNames = {
  GET_ARTICLES_STATE: 'get_articles_state',
  CONFIRM_READ_ARTICLES_STATE: 'confirm_read_articles_state',
  CONFIRM_READ_ABSTRACTS_STATE:'confirm_read_abstracts_state',
  READ_ABSTRACTS_STATE: 'read_abstracts_state',
  COMPLETED_STATE: 'completed_state'
}
const s3Bucket = `${process.env.AWS_BUCKET_NAME}/abstracts`;

class AbstractIntentHandler extends StateIntentBaseManager {
  constructor(application, user, userId, intentConfirmation, dialogStarted, dialogInProgress, dialogCompleted, slots) {
    const states = [
      stateNames.GET_ARTICLES_STATE,
      stateNames.CONFIRM_READ_ARTICLES_STATE,
      stateNames.CONFIRM_READ_ABSTRACTS_STATE,
      stateNames.READ_ABSTRACTS_STATE,
      stateNames.COMPLETED_STATE
    ];

    super(application, user, userId, intentTypes.ABSTRACT, contextTypes.ABSTRACT, slots, states);

    this.intentConfirmation = intentConfirmation;
    this.dialogStarted = dialogStarted;
    this.dialogInProgress = dialogInProgress;
    this.dialogCompleted = dialogCompleted;
  }
  setState() {
    return new Promise((resolve, reject) => {
      console.log(`[Order Intent Base] Setting State`);

      if(_.isEmpty(this.states)) { reject(new Error("A state intent handler must have atleast 1 state")) }

      this.currentState = (this.context.context) ? this.context.context.state : null;

      if(!this.currentState || this.dialogStarted) {
        this.currentState = stateNames.GET_ARTICLES_STATE;
      }

      resolve();
    });
  }
  handleState() {
    return new Promise((resolve, reject) => {
      switch(this.currentState) {
        case stateNames.GET_ARTICLES_STATE:
          this.currentState = stateNames.CONFIRM_READ_ARTICLES_STATE;
          break;
        case stateNames.CONFIRM_READ_ARTICLES_STATE:
          if(!this.intentConfirmation) {
            this.currentState = stateNames.COMPLETED_STATE;
            this.context.status = contextStatusTypes.COMPLETED;
          } else {
            this.currentState = stateNames.CONFIRM_READ_ABSTRACTS_STATE;
          }
          break;
        case stateNames.CONFIRM_READ_ABSTRACTS_STATE:
          if(!this.intentConfirmation) {
            this.currentState = stateNames.COMPLETED_STATE;
            this.context.status = contextStatusTypes.COMPLETED;
          } else {
            this.currentState = stateNames.READ_ABSTRACTS_STATE;
          }
          break;
        case stateNames.COMPLETED_STATE:
          break;
        default:
          reject(new Error("Invalid State"));
      }
      resolve();
    })
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Abstract IntentHandler] Getting Response Prompt`);

      const response = new IntentResponse();

      let prompt;
      switch(this.currentState) {
        case stateNames.CONFIRM_READ_ARTICLES_STATE:
          prompt = 'I found 3 journal articles that may interest you. ';
          prompt += 'Would you like me to read them to you?';

          response.confirmIntent = true;

          break;
        case stateNames.CONFIRM_READ_ABSTRACTS_STATE:
          prompt = `Ok, the first article was published in publication, the article title is article title. `;
          prompt += 'Would you like me to read the abstract?'

          response.confirmIntent = true;

          break;
        case stateNames.READ_ABSTRACTS_STATE:
          const abstractUrl = `https://s3.amazonaws.com/${s3Bucket}/test.mp4`;

          const audio = {
             "url": abstractUrl,
             "token": "1", //journalArticle._id,
             "offsetInMilliseconds": 0
           };
          response.audio = audio;

          break;
        case stateNames.COMPLETED_STATE:
          response.shouldEndSession = true;

          break;
        default:
          return reject(new Error(`Unknown state ${this.currentState}`));
      }

      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = null;

      return resolve(response);
    });
  }
};

export default AbstractIntentHandler;
