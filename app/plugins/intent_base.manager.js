import IntentResponse from '../managers/intent_response';
import UserContext from '../models/user_context';

import _ from 'lodash';

import * as contextStatusTypes from '../models/types/userContextStatusTypes';

class IntentBaseManager {
  constructor(application, user, userId, intentType, contextType, slots) {
    this.application = application;
    this.user = user;
    this.userId = userId;
    this.intentType = intentType;
    this.contextType = contextType;
    this.slotDefinitions = [];
    this.slots = slots;
    this.context;
    this.entityName;
    this.entity;
    this.repository;
    this.timeToExpireContext = new Date(+new Date() + 2+24+60*60*1000);
  }
  fulfillIntent(callback) {
    console.log(`[Base IntentHandler] Handling Intents ${this.intentType}`);

    let exit = false;

    this.getContext()
    .then((response) => {
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
      if(exit) { return; }

      if(response) {
        exit = true;

        return callback(null, response);
      } else {
        return this.validateEntity();
      }
    })
    .then((response) => {
      if(exit) { return; }

      if(response) {
        exit = true;

        return callback(null, response);
      } else {
        return this.execute();
      }
    })
    .then((response) => {
      if(exit) { return; }

      if(response) {
        exit = true;

        return callback(null, response);
      } else {
        return this.getResponsePrompt();
      }
    })
    .then((response) => {
      if(exit) { return; }

      this.response = response;

      return this.queueJobs();
    })
    .then((response) => {
      if(exit) { return; }

      return this.saveContext();
    })
    .then((response) => {
      if(exit) { return; }

      return callback(null, this.response);
    })
    .catch((err) =>{
      return callback(err);
    });
  }
  getSlotValue(slotName) {
    let slotValue;
    const slot = _.find(this.slots, { key: slotName });

    if(slot) {
      slotValue = (slot.value) ? slot.value.trim() : null;
    }

    return slotValue;
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[Base IntentHandler] Validating Slots`);

      _.each(this.slotDefinitions, (slotDefinition) => {
        const slotValue = this.getSlotValue(slotDefinition.key);
        console.log(slotValue);
        if(!slotValue && slotDefinition.required) {
          const response = new IntentResponse();

          response.prompt = slotDefinition.missingPrompt;
          response.reprompt = slotDefinition.missingReprompt;
          response.elicitSlot = {
            slotName: slotDefinition.key,
            clearIntent: false
          };

          resolve(response);

          return false;
        }
      });

      resolve();
    });
  }
  getRepository() {
    return new Promise((resolve, reject) => {
      console.log(`[Base IntentHandler] Get Repository`);

      resolve();
    });
  }
  validateEntity() {
    return new Promise((resolve, reject) => {
      console.log(`[Base IntentHandler] Validating Entities`);

      resolve();
    });
  }
  execute() {
    return new Promise((resolve, reject) => {
      console.log(`[Base IntentHandler] Execute`);

      resolve();
    });
  }
  getContext() {
    return new Promise((resolve, reject) => {
      console.log("[Base IntentHandler] Getting Context");

      UserContext.getContext(this.userId, this.contextType)
      .then((userContext) => {
        this.context = userContext;

        resolve();
      })
      .catch((err) => {
        reject(err)
      });
    });
  }
  saveContext(currentContext) {
    return new Promise((resolve, reject) => {
      console.log(`[Base IntentHandler] Saving Context`);

      this.context.markModified('context');
      this.context.save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  getFromContext() {
    return new Promise((resolve, reject) => {
      console.log(`[Base IntentHandler] Getting from Context`);

      if(!this.user) { return resolve(); }

      UserContext.getContext(this.user._id, this.contextType)
      .then((userContext) => {
        if(userContext &&
          userContext.context) {
            if(userContext.context.entity){
              Entity.findById(userContext.context.entity)
              .then((entity) => {
                this.entity = entity;

                resolve([null]);
              })
              .catch((err) => {
                reject(err);
              })
            } else if(userContext.context.entityName) {
              resolve([null, userContext.context.entityName]);
            } else {
              resolve(null);
            }
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  setContext() {
    return new Promise((resolve, reject) => {
      console.log(`[Base IntentHandler] Setting Context`);

      if(!this.context) {
        this.context = new UserContext({
          user_identifier: this.userId,
          type: this.contextType,
          intent: this.intentType,
          status: contextStatusTypes.IN_PROGRESS,
          time_to_expire: this.timeToExpireContext,
          context: {}
        });
      }
      if(this.user) {
        this.context.user = this.user;
      }
      if(this.entity) {
        this.context.context.entity = this.entity._id;
        this.context.context.entityName = this.entity.name;
      }

      resolve();
    })
  }
  queueJobs() {
    return new Promise((resolve, reject) => {
      console.log(`[Base IntentHandler] Queuing Post Processing Jobs`);

      const message = `I looked up some information`;

      try {
        instance.connections.queue.default()
        .publish({
          channel: "#realtimeevents",
          username: "HelixBot",
          message: message
        }, { key: queues.SLACK_QUEUE });
      } catch (e) {
        console.error("[AMQP] publish", e.message);
      }
      //
      // try {
      //   instance.connections.queue.default()
      //   .publish({
      //     intent: intentTypes.PROTOCOL,
      //     request: {
      //       property: propertyName,
      //       resolved_property: resolvedPropertyName,
      //       entity: originalEntityName,
      //       resolved_entity: resolvedEntityName,
      //       property_value: propertyValue
      //     },
      //     prompt: res.say,
      //     resolved: true
      //   }, { key: queues.AUDIT_LOG_QUEUE });
      // } catch (e) {
      //   console.error("[AMQP] publish", e.message);
      // }

      resolve([true]);
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Base IntentHandler] Getting Response Prompt`);

      let prompt = '';

      prompt += "Hmm, I not sure about that.";;

      const response = new IntentResponse();

      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;

      return resolve(response);
    });
  }
}

export default IntentBaseManager;
