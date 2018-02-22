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

class InventoryAmountStatusSummaryIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.INVENTORYCHECKOUT, contextTypes.INVENTORY, slots);

    this.inventoryItem;
    this.inventoryItemStatus;
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[InventoryItemAmountStatus IntentHandler] Validating Slots`);

      resolve();
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
      console.log(`[InventoryItemAmountStatus IntentHandler] Validating Entities`);

      resolve();
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[InventoryAmountStatusSummary IntentHandler] Getting Response Prompt`);

      let prompt = `I only have one note. `;
      prompt += '<break time="0.3s" /> ';
      prompt += `We're running low on ethyl acetate.`;

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

export default InventoryAmountStatusSummaryIntentHandler;
