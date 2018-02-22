import { Entity,
  Repository,
  RepositoryType } from '../../models';
import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';
import * as entityTypes from '../../models/types/entityTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import StateIntentBaseManager from '../state_intent_base.intent_handler';
import IntentResponse from '../../managers/intent_response';

const stateNames = {
  GET_PRODUCT_NAME: 'get_product_name',
  GET_ORDER_HISTORY: 'get_order_history',
  CONFIRM_REORDER: 'confirm_reorder',
  GET_VENDOR_NAME: 'get_vendor_name',
  GET_ITEM_SIZE: 'get_size',
  GET_QUANTITY: 'get_quantity',
  CONFIRM_ORDER: 'confirm_order',
  COMPLETED_ORDER: 'order_completed',
  ORDER_CANCELLED: 'order_cancelled'
}

class InventoryOrderIntentHandler extends StateIntentBaseManager {
  constructor(application, user, userId, intentConfirmation, dialogStarted, dialogInProgress, dialogCompleted, slots) {

    const states = [
      stateNames.GET_PRODUCT_NAME,
      stateNames.GET_ORDER_HISTORY,
      stateNames.CONFIRM_REORDER,
      stateNames.GET_VENDOR_NAME,
      stateNames.GET_ITEM_SIZE,
      stateNames.GET_QUANTITY,
      stateNames.CONFIRM_ORDER,
      stateNames.ORDER_COMPLETE,
      stateNames.ORDER_CANCELLED,
    ];

    super(application, user, userId, intentTypes.ORDER, contextTypes.ORDER, slots, states);

    console.log(slots);
    this.slotDefinitions.push({
      key: "Entity",
      required: true
    });
    this.slotDefinitions.push({
      key: "VendorName",
      required: false
    });
    this.slotDefinitions.push({
      key: "ItemSize",
      required: false
    });
    this.slotDefinitions.push({
      key: "Quantity",
      required: false
    });
    this.intentConfirmation = intentConfirmation;
    this.dialogStarted = dialogStarted;
    this.dialogInProgress = dialogInProgress;
    this.dialogCompleted = dialogCompleted;
    this.entityName;
    this.order;
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[Order IntentHandler] Validating Slots`);

      super.validateSlots()
      .then(() => {
        this.entityName = this.getSlotValue("Entity");

        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  getRepository(entityType) {
    return new Promise((resolve, reject) => {
      console.log(`[Order IntentHelper] Getting Repository ${this.application.owner}`);

      Repository.findOne({
        entity_type: entityTypes.ORDERITEM,
        owner: this.application.owner
      })
      .then((repository) => {
        this.repository = repository;
        console.log(this.repository);

        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  setState() {
    return new Promise((resolve, reject) => {
      console.log(`[Order IntentHandler] Setting State ${this.dialogStarted} ${this.entityName} ${this.currentState}`);

      if(_.isEmpty(this.states)) { reject(new Error("A state intent handler must have atleast 1 state")) }

      this.currentState = (this.context.context) ? this.context.context.state : null;
      console.log(this.currentState);
      if(!this.currentState || this.dialogStarted) {
        if(!this.entityName) {
          this.currentState = stateNames.GET_PRODUCT_NAME;
        } else {
          this.currentState = stateNames.GET_ORDER_HISTORY;
        }
      }

      resolve();
    });
  }
  handleState() {
    return new Promise((resolve, reject) => {
      console.log(`[Order IntentHandler] Handling State ${this.currentState}`);

      switch(this.currentState) {
        case stateNames.GET_PRODUCT_NAME:
          resolve();

          break;
        case stateNames.GET_ORDER_HISTORY:
          //Get order history
          this.currentState = stateNames.CONFIRM_REORDER;
          //if no order history, go to GET_VENDOR_NAME
          //this.currentState = states.GET_VENDOR_NAME;
          resolve();

          break;
        case stateNames.CONFIRM_REORDER:
          if(this.intentConfirmation) {
            if(!this.repository) {
              RepositoryType.findOne({
                entity_type: entityTypes.ORDERITEM
              })
              .then((repository_type) => {
                if(!repository_type) { return reject(new Error(`Unable to find repository type ${entityTypes.ORDERITEM}`)); }

                const repository = new Repository();

                repository.name = `Orders - ${new Date()}`;
                repository.repository_type = repository_type;
                repository.entity_type = entityTypes.ORDERITEM;
                repository.owner_type = "Company";
                repository.owner = this.application.owner;
                repository.attributes = {};
                repository.private = true;

                return repository.save();
              })
              .then((savedRepository) => {
                const entity = new Entity();

                entity.name = `${this.entityName}`
                entity.type = entityTypes.ORDERITEM;
                entity.repository = savedRepository;
                entity.attributes = {};

                return entity.save();
              })
              .then((savedEntity) => {
                this.currentState = stateNames.ORDER_COMPLETE;

                resolve();
              })
              .catch((err) => {
                reject(err);
              });
            } else {
              const entity = new Entity();

              entity.name = `${this.entityName}`
              entity.type = entityTypes.ORDERITEM;
              entity.repository = this.repository;
              entity.attributes = {};

              entity.save()
              .then(() => {
                this.currentState = stateNames.ORDER_COMPLETE;

                resolve();
              })
              .catch((err) => {
                reject(err);
              });
            }
          } else {
            this.currentState = stateNames.GET_VENDOR_NAME;
          }

          break;
        case stateNames.GET_VENDOR_NAME:
          //validate vendor name
          this.currentState = stateNames.GET_ITEM_SIZE;

          resolve();

          break;
        case stateNames.GET_ITEM_SIZE:
          this.currentState = stateNames.GET_QUANTITY;

          resolve();

          break;
        case stateNames.GET_QUANTITY:
          this.currentState = stateNames.CONFIRM_ORDER;

          resolve();
          break;
        case stateNames.CONFIRM_ORDER:
          if(this.intentConfirmation) {
            //place order
            this.currentState = stateNames.ORDER_COMPLETE;

            resolve();
          } else {
            this.currentState = stateNames.ORDER_CANCELLED;

            resolve();
          }
          break;
        case stateNames.ORDER_COMPLETE:
          resolve();

          break;
        case stateNames.ORDER_CANCELLED:
          resolve();

          break;
        default:
          reject(new Error("Invalid State"));
      }
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Order IntentHandler] Getting Response Prompt`);

      const response = new IntentResponse();

      let prompt;
      switch(this.currentState) {
        case stateNames.GET_PRODUCT_NAME:
          prompt = `What is the name of the product?`;

          response.elicitSlot = {
            slotName: "ProductName",
            clearIntent: false
          };

          break;
        case stateNames.CONFIRM_REORDER:
          //prompt = `Ok. I found ${inventoryItem.name} in your inventory.  You previously purchased a ${previousOrder.item_size} container from ${previousOrder.vendor_name}. Should I reorder this product?`
          prompt = `Ok. Please confirm, you want to reorder ${this.entityName}?`

          response.confirmIntent = true;

          break;
        case stateNames.GET_VENDOR_NAME:
          //prompt = `${inventoryItem.name} can be ordered from Sigma-Aldrich, Pure Chemistry, and Aurora Fine Chemicals.  Which vendor would you like to use?`;
          prompt = `Acetic Anhydride can be ordered from Sigma-Aldrich, Pure Chemistry, and Aurora Fine Chemicals.  Which vendor would you like to use?`;

          response.elicitSlot = {
            slotName: "VendorName",
            clearIntent: false
          };

          break;
        case stateNames.GET_ITEM_SIZE:
          //prompt = `${inventoryItem.name} is available in 100mL, 400mL, 500mL, or 1L pack size?  Which size would you like to reorder?`;
          prompt = `Acetic Anhydride is available in 100mL, 400mL, 500mL, or 1L pack size?  Which size would you like to reorder?`;

          response.elicitSlot = {
            slotName: "ItemSize",
            clearIntent: false
          };

          break;
        case stateNames.GET_QUANTITY:
          prompt = `What quantity?`;

          response.elicitSlot = {
            slotName: "Quantity",
            clearIntent: false
          };

          break;
        case stateNames.CONFIRM_ORDER:
          prompt = `Confirm your order`;

          response.confirmIntent = true;

          break;
        case stateNames.ORDER_COMPLETE:
          prompt = 'Ok. ';
          // if(order.quantity == 1) {
          //   prompt += `I added a ${order.item_size} container of ${inventoryItem.name} to your order requests.`;
          // } else {
          //   prompt += `I added ${order.quantity}, ${order.item_size} containers of ${inventoryItem.name} to your order requests.`;
          // }
          //if(order.quantity == 1) {
          //   prompt += `I added a 100ml container of Acetic Anhydride to your order requests.`;
          // } else {
          //   prompt += `I added 2, 100ml containers of Acetic Anhydride to your order requests.`;
          // }
          prompt += `I added ${this.entityName} to your order requests.`;

          response.shouldEndSession = true;

          break;
        case stateNames.ORDER_CANCELLED:
          prompt = 'Ok. I cancelled this order.';

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

export default InventoryOrderIntentHandler;
