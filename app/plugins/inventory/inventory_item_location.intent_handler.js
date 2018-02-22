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

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class InventoryItemLocationIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.INVENTORYITEMLOCATION, contextTypes.INVENTORY, slots);

    this.slotDefinitions.push({
      key: "ProductName",
      required: true,
      missingPrompt: "I didn't quite get that.  What product are you looking for?.",
      missingReprompt: "Say the product name again.",
      invalidPrompt: "I didn't find that product in your inventory. Can you try again?",
      invalidReprompt: "Say the product name again."
    });
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[InventoryItemLocation IntentHandler] Validating Slots`);

      super.validateSlots()
      .then((response) => {
        this.entityName = this.getSlotValue("ProductName");

        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  getRepository(entityType) {
    return new Promise((resolve, reject) => {
      console.log(`[InventoryItemLocation IntentHelper] Getting Repository`);

      Repository.findOne({
        entity_type: entityTypes.INVENTORYITEM,
        owner: this.application.owner
      })
      .then((repository) => {
        if(!repository) { return reject(new Error(`Repository Not Found ${entityTypes.INVENTORYITEM} for ${this.application.owner}`)); }

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
      console.log(`[InventoryItemLocation IntentHelper] Validating Entities`);

      Entity.findOne({
        name_lower: `${this.entityName.toLowerCase()}`,
        repository:  `${this.repository._id}`
      })
      .then((entity) => {
        if(entity) {
          this.entity = entity;

          resolve();
        } else {
          const response = new IntentResponse();
          const prompt = "I didn't find that product in your inventory. Can you try again?";
          const reprompt = "Say the product name again.";

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
      console.log(`[InventoryItemLocation] Getting Response Prompt`);

      const name = `${this.entity.name}`;
      const location = this.entity.attributes.location;
      const sub_location = this.entity.attributes.sub_location;
      const location_detail = this.entity.attributes.location_detail;

      let prompt = '';

      if(location) {
        prompt += `Your ${name} is located in ${location}`;
        if(sub_location) {
          prompt += `, ${sub_location}`;
        }
        if(location_detail) {
          prompt += `, ${location_detail}`
        }
        prompt += ".";
      } else {
        prompt += `Sorry, a location is not specified for ${name}.`;
      }
      const response = new IntentResponse();

      response.response_type = "Prompt";
      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = null;


      return resolve(response);
    });
  }
};

export default InventoryItemLocationIntentHandler;
