import {
  Entity,
  Repository } from '../../models';

import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';
import * as inventoryItemStatusTypes from '../../models/types/inventoryItemStatusTypes';
import * as entityTypes from '../../models/types/entityTypes';

import _ from 'lodash';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class InventoryItemUpdateStatusIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots, inventoryItemAction) {
    //TODO: Intent should either by INVENTORYCHECKOUT or INVENTORYCHECKIN
    super(application, user, userId, intentTypes.INVENTORYCHECKOUT, contextTypes.INVENTORY, slots);

    this.slotDefinitions.push({
      key: "Entity",
      required: true,
      missingPrompt: "What's the product name?.",
      missingReprompt: "Say the product name again.",
      invalidPrompt: "I didn't find that product in your inventory. Can you try again?",
      invalidReprompt: "Can you try checking out the item again."
    });
    this.slotDefinitions.push({
      key: "Name",
      required: true,
      missingPrompt: "Ok, can you say your name?.",
      missingReprompt: "To checkout acetic anhydride, say your name.",
      invalidPrompt: "Hmm, I'm sorry. I didn't get that.  Can you try again?",
      invalidReprompt: "Can you try checking out the item again."
    });
    this.inventoryItem;
    this.name;
    this.inventoryItemAction = inventoryItemAction;
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[InventoryItemLocation IntentHandler] Validating Slots`);

      super.validateSlots()
      .then((response) => {
        this.entityName = this.getSlotValue("Entity");
        this.name = this.getSlotValue("Name");

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
      console.log(`[InventoryItemCheckout IntentHandler] Validating Entities`);

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
          const reprompt = "Say the product name again.";

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
      switch(this.inventoryItemAction) {
        case inventoryItemStatusTypes.CHECK_OUT:
          this.inventoryItem.attributes.checkout_status = inventoryItemStatusTypes.CHECK_OUT;
          this.inventoryItem.attributes.last_checked_out_by = this.name;

          break;
        case inventoryItemStatusTypes.CHECK_IN:
          this.inventoryItem.attributes.checkout_status = inventoryItemStatusTypes.CHECK_IN
          this.inventoryItem.attributes.last_checked_out_by = this.name;

          break;
        default:
          return reject(new Error(`Not sure how to handle inventory item status ${status}`));
      }
      this.inventoryItem.markModified('attributes');
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
      console.log(`[InventoryItemCheckout IntentHandler] Getting Response Prompt`);

      let prompt = '';

      switch(this.inventoryItemAction) {
        case inventoryItemStatusTypes.CHECK_OUT:
          prompt = `Ok, I checked out ${this.inventoryItem.name}.`;

          break;
        case inventoryItemStatusTypes.CHECK_IN:
          prompt = `Ok, I checked in ${this.inventoryItem.name}.`;

          break;
        default:
          return reject(new Error(`Not sure how to handle inventory item status ${status}`));
      }

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

export default InventoryItemUpdateStatusIntentHandler;
