import {
  Entity,
  Repository } from '../../models';
import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';
import * as entityTypes from '../../models/types/entityTypes';

import _ from 'lodash';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class InventoryItemAmountStatusIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.INVENTORYAMOUNTSTATUSSUMMARY, contextTypes.INVENTORY, slots);

    this.slotDefinitions.push({
      key: "Entity",
      required: true,
      missingPrompt: "I didn't quite get that.  What product are you trying to update?.",
      missingReprompt: "Say the product name again.",
      invalidPrompt: "I didn't find that product in your inventory. Can you try again?",
      invalidReprompt: "Say the product name and amount in stock again."
    });
    this.slotDefinitions.push({
      key: "InventoryAmount",
      required: true,
      missingPrompt: "I didn't quite get that. Tell the status of the item in stock.",
      missingReprompt: "You can say low or out.",
      invalidPrompt: "I didn't find that product in your inventory. Can you try again?",
      invalidReprompt: "Say the product name and amount in stock again."
    });
    this.inventoryItem;
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[InventoryItemAmountStatus IntentHandler] Validating Slots`);

      super.validateSlots()
      .then((response) => {
        this.entityName = this.getSlotValue("Entity");

        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  getRepository(entityType) {
    return new Promise((resolve, reject) => {
      console.log(`[InventoryItemAmountStatus IntentHelper] Getting Repository`);

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
      console.log(`[InventoryItemCheckoutStatus IntentHandler] Validating Entities`);

      Entity.findOne({
        name_lower: `${this.entityName.toLowerCase()}`,
        repository:  `${this.repository._id}`
      })
      .then((inventoryItem) =>{
        if(inventoryItem) {
          this.inventoryItem = inventoryItem;

          resolve();
        } else {
          const response = new IntentResponse();
          const prompt = "I didn't find that product in your inventory. Can you try again?";
          const reprompt = "Try searching your inventory again.";

          response.response_type = "Prompt";
          response.prompt = prompt;
          response.reprompt = reprompt;
          response.slotName = null;
          response.clearIntent = false;

          resolve(response);
        }
      });
    });
  }
  execute() {
    return new Promise((resolve, reject) => {
      console.log(`[InventoryItemAmountStatus IntentHandler] Execute`);

      const status = this.getSlotValue("InventoryAmount");

      this.inventoryItem.status = status;

      this.inventoryItem.save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[InventoryItemAmountStatus IntentHandler] Getting Response Prompt`);

      const prompt = 'Ok, I made a note.';

      const response = new IntentResponse();

      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = null;

      resolve(response);
    });
  }
};

export default InventoryItemAmountStatusIntentHandler;
