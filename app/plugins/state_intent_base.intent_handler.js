import IntentBaseManager from './intent_base.manager';
import IntentResponse from '../managers/intent_response';

import _ from 'lodash';

class StateIntentBaseManager extends IntentBaseManager {
  constructor(application, user, userId, intentType, contextType, slots, states) {
    super(application, user, userId, intentType, contextType, slots);

    this.states = states;
    this.currentState;
    this.nextState;
  }
  fulfillIntent(callback) {
    console.log(`[State Intent Base] Fulfill Intent ${this.intentType}`);

    this.getContext()
    .then(() => {
      return this.setContext();
    })
    .then(() => {
      return this.validateSlots();
    })
    .then((response) => {
      if(response) {
        exit = true;

        return callback(null, response);
      } else {
        return this.getRepository();
      }
    })
    .then((response) => {
      if(response) {
        return callback(null, response);
      } else {
        return this.setState();
      }
    })
    .then((response) => {
      if(response) {
        return callback(null, response);
      } else {
        return this.handleState();
      }
    })
    .then((response) => {
      if(response) {
        return callback(null, response);
      } else {
        return this.getResponsePrompt();
      }
    })
    .then((response) => {
      this.response = response;

      return this.updateState();
    })
    .then((response) => {
      return this.queueJobs();
    })
    .then((response) => {
      return this.saveContext();
    })
    .then((response) => {
      return callback(null, this.response);
    })
    .catch((err) =>{
      return callback(err);
    });
  }
  setState() {
    return new Promise((resolve, reject) => {
      console.log(`[State Intent Base] Setting State`);

      if(_.isEmpty(this.states)) { reject(new Error("A state intent handler must have atleast 1 state")) }

      this.currentState = this.context.context.state;

      if(!this.currentState) {
        this.currentState = this.states[0];
        this.context.context = {
          state: this.currentState
        }
      }

      resolve();
    });
  }
  updateState() {
    return new Promise((resolve, reject) => {
      console.log(`[State Intent Base] Updating State`);

      if(_.isEmpty(this.states)) { reject(new Error("A state intent handler must have atleast 1 state")) }

      this.context.context = {
        state: this.currentState
      }

      resolve();
    });
  }
  handleState() {
    return new Promise((resolve, reject) => {
      console.log(`[State Intent Base] Handling State ${this.currentState}`);

      reject(new Error("You must implement handle state"));
    });
  }
}

export default StateIntentBaseManager;
