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

class UpdateInventoryItemAmount extends IntentBaseManager {
  constructor(application, user, userId, slots, operation) {
    super(application, user, userId, intentTypes.INVENTORYCHECKOUT, contextTypes.INVENTORY, slots);
    console.log(`Subtract ${JSON.stringify(slots)}`);
    this.slotDefinitions.push({
      key: "Entity",
      required: true,
      missingPrompt: "What's the product name?.",
      missingReprompt: "Say the product name again.",
      invalidPrompt: "I didn't find that product in your inventory. Can you try again?",
      invalidReprompt: "Can you try checking out the item again."
    });
    this.slotDefinitions.push({
      key: "Amount",
      required: true,
      missingPrompt: "Ok, can you say the amount again?.",
      missingReprompt: "To checkout acetic anhydride, say your name.",
      invalidPrompt: "Hmm, I'm sorry. I didn't get that.  Can you try again?",
      invalidReprompt: "Can you try checking out the item again."
    });
    this.slotDefinitions.push({
      key: "Units",
      required: true,
      missingPrompt: "Ok, can you say you the units again?.",
      missingReprompt: "To checkout acetic anhydride, say your name.",
      invalidPrompt: "Hmm, I'm sorry. I didn't get that.  Can you try again?",
      invalidReprompt: "Can you try checking out the item again."
    });
    this.inventoryItem;
    this.name;
    this.amount;
    this.units;
    this.operation = operation;
    this.inventoryItem;
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[InventoryItemLocation IntentHandler] Validating Slots`);

      super.validateSlots()
      .then((response) => {
        this.entityName = this.getSlotValue("Entity");
        this.amount = this.getSlotValue("Amount");
        this.units = this.getSlotValue("Units");

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

      if(!this.inventoryItem.attributes.quantity) {
        this.inventoryItem.attributes.quantity = 0;
      }
      switch(this.operation) {
        case "Subtract":
        this.inventoryItem.attributes.quantity = parseInt(this.inventoryItem.attributes.quantity) - parseInt(this.amount);
        break;
        case "Add":
        this.inventoryItem.attributes.quantity = parseInt(this.inventoryItem.attributes.quantity) + parseInt(this.amount);
        break;
        default:
        reject(new Error('Don\'t know how to handle the operation ${this.operation}'));
      }
      this.inventoryItem.markModified('attributes')
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
      console.log(`[InventoryAmountStatusSummary IntentHandler] Getting Response Prompt`);

      let prompt = `Ok. `;
      prompt += '<break time="0.3s" />';
      prompt += `I updated the inventory for ${this.inventoryItem.name}. We have about ${this.inventoryItem.attributes.quantity}${this.inventoryItem.attributes.units} remaining.`;

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

export default UpdateInventoryItemAmount;
