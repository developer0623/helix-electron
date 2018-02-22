import {
  Entity,
  Repository,
  UserContext } from '../../models';

import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';
import * as entityTypes from '../../models/types/entityTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class ProtocolIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.PROTOCOL, contextTypes.PROTOCOL, slots);

    this.slotDefinitions.push({
      key: "ProtocolName",
      required: true,
      missingPrompt: "Which protocol?",
      missingReprompt: "Say the protocol name again.",
      invalidPrompt: "I don't know that protocol? Can you try again?",
      invalidReprompt: "Say the protocol name again."
    });
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[Protocol IntentHandler] Validating Slots`);

      super.validateSlots()
      .then((response) => {
        this.entityName = this.getSlotValue("ProtocolName");

        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  getRepository(entityType) {
    return new Promise((resolve, reject) => {
      Repository.findOne({
        entity_type: entityTypes.PROTOCOL,
        owner: this.application.owner
      })
      .then((repository) => {
        if(!repository) { return reject(new Error(`Repository Not Found ${entityTypes.PROTOCOL} for ${this.application.owner}`)); }

        this.repository = repository;

        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  validateEntity() {
    return new Promise((resolve, reject) => {
      console.log(`[Protocol IntentHandler] Validating Protocol ${this.entityName.toLowerCase()}`);

      Entity.findOne({
        name_lower: `${this.entityName.toLowerCase()}`,
        repository: `${this.repository._id}`
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
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[ProtocolManager] Getting Response Prompt`);

      let prompt = '';

      prompt += "Ok. I can help you with that protocol. ";
      prompt += "When you\'re ready, ask me for the first step.";
      const reprompt = "Say what's the first step to start the protocol.";

      const response = new IntentResponse();

      response.response_type = "Prompt";
      response.prompt = prompt;
      response.reprompt = reprompt;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = "What's the next step?";

      if(this.entity.attributes.steps && this.entity.attributes.steps.length > 0) {
        const listItems = [];
        _.each(this.entity.attributes.steps, (step) => {
          listItems.push({
            primary_text: step.name
          });
        });
        response.listTemplate = {
          token: this.entity._id,
          name: this.entity.name,
          items: listItems
        };
      }

      return resolve(response);
    });
  }
  saveContext() {
    return new Promise((resolve, reject) => {
      this.context.context = {
        entity: this.entity._id,
        entityName: this.entityName
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

export default ProtocolIntentHandler;
