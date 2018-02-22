import DeviceHelper from './device_helper';
import _ from 'lodash';

import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';
import * as inventoryItemStatusTypes from '../../models/types/inventoryItemStatusTypes';

import InventoryItem from '../../models/inventoryItem';

import InventoryItemLocationIntentHandler from '../../plugins/inventory/inventory_item_location.intent_handler';
import InventoryItemCheckoutStatusIntentHandler from '../../plugins/inventory/inventory_item_checkout_status.intent_handler';
import InventoryItemUpdateStatusIntentHandler from '../../plugins/inventory/inventory_item_update_status.intent_handler';
import InventoryItemAmountStatusIntentHandler from '../../plugins/inventory/inventory_item_amount_status.intent_handler';
import InventoryAmountStatusSummaryIntentHandler from '../../plugins/inventory/inventory_amount_status_summary.intent_handler';
import UpdateInventoryItemAmountIntentHandler from '../../plugins/inventory/update_inventory_item_amount.intent_handler';
import NEBInventoryItemLookupIntentHandler from '../../plugins/inventory/neb/neb.inventory_item_lookup.intent_handler';
import NEBInventoryCheckoutIntentHandler from '../../plugins/inventory/neb/neb.inventory_checkout.intent_handler';

import AlexaResponseHandler from '../../managers/alexa.response_handler';

function log(action) {
  console.log("Inventory Controller: " + action)
}
function logError(error) {
  console.log("Error: " + error + ": " + error.stack);
}
function setContext(req, res, resolvedProductName, inventoryItem) {
  return new Promise((resolve, reject) => {
    log("Setting Context");

    req.currentContext = {
      type: contextTypes.INVENTORY,
      intent: intentTypes.INVENTORY,
      context: {
        productName: resolvedProductName,
        inventoryItem: inventoryItem._id
      }
    };
    let timeToExpire = new Date(+new Date() + 5*60*1000)
    req.currentContext.time_to_expire = timeToExpire;

    resolve([true]);
  })
}
function setTemplateDirectives(req, res, productName, resolvedProductName, inventoryItem) {
  return new Promise((resolve, reject) => {
    log("Setting Template Directive");

    if(!DeviceHelper.supportsDisplay(req) && !DeviceHelper.isSumulator(req)) {
      return resolve([false]);
    }

    if(!inventoryItem) { return resolve([false]); }

    //const imageObject = getImageObject(recipe);

    //if(!imageObject) { return resolve([false]); }

    let prompt= '';
    prompt = `Your ${resolvedProductName} is located in ${inventoryItem.location}`;
    if(inventoryItem.sub_location) {
      prompt += `, ${inventoryItem.sub_location}`;
    }
    if(inventoryItem.location_detail) {
      prompt += `${inventoryItem.location_detail}.`;
    }

    const directive = {
      "type": "Display.RenderTemplate",
      "template": {
        "type": "BodyTemplate2",
        "token": inventoryItem._id,
        "backButton": "HIDDEN",
        //"backgroundImage": "Image",
        "title": resolvedProductName,
        //"image": imageObject,
        "textContent": {
          "primaryText":{
            "type": "RichText",
            "text": `<font size="4">${prompt}</font>`
          }
        }
      }
    };

    res.response.response.directives.push(directive)

    resolve([true]);
  })
}
function setCardDirective(req, res, productName, resolvedProductName, inventoryItem) {
  return new Promise((resolve, reject) => {
    log("Setting Card Directive");

    let prompt= '';
    prompt = `Your ${resolvedProductName} is located in ${inventoryItem.location}`;
    if(inventoryItem.sub_location) {
      prompt += `, ${inventoryItem.sub_location}`;
    }
    if(inventoryItem.location_detail) {
      prompt += `${inventoryItem.location_detail}.`;
    }

    res.card({
      type: "Simple",
      title: resolvedProductName,
      content: prompt
    });

    resolve([true]);
  });
}
function getSlotValue(slots, slotName) {
  const entitySlot = slots[slotName];

  if(!entitySlot) { return null; }

  const resolvedValues = entitySlot.resolvedValues();

  if(!_.isEmpty(resolvedValues)) {
    return resolvedValues[0];
  } else {
    return entitySlot.value;
  }
}
const AlexaInventoryController = {
  GetInventoryItemLocation: (req, res) => {
    return new Promise((resolve, reject) => {
      log("Getting Inventory Item Location");

      const userId = req.data.session.user.userId;
      const slots = [];
      slots.push({
        key: "ProductName",
        value: getSlotValue(req.slots, "ProductName")
      });
      const intentHandler = new InventoryItemLocationIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "InventoryItemLocationIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  GetInventoryItemCheckoutStatus: (req, res) => {
    return new Promise((resolve, reject) => {
      log("Checkout Inventory Item Status");

      const userId = req.data.session.user.userId;
      const slots = [];
      slots.push({
        key: "ProductName",
        value: getSlotValue(req.slots, "ProductName")
      });
      const intentHandler = new InventoryItemCheckoutStatusIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "InventoryItemCheckoutStatusIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  CheckoutInventoryItem: (req, res) => {
    return new Promise((resolve, reject) => {
      log("Checkout Inventory Item");

      const userId = req.data.session.user.userId;
      const slots = [];
      slots.push({
        key: "Entity",
        value: getSlotValue(req.slots, "Entity")
      });
      slots.push({
        key: "Name",
        value: getSlotValue(req.slots, "Name")
      });
      const intentHandler = new InventoryItemUpdateStatusIntentHandler(req.application, req.user, userId, slots, inventoryItemStatusTypes.CHECK_OUT);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "InventoryCheckoutIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  CheckInInventoryItem: (req,  res) => {
    return new Promise((resolve, reject) => {
      log("Checkin Inventory Item");

      const userId = req.data.session.user.userId;
      const slots = [];
      slots.push({
        key: "Entity",
        value: getSlotValue(req.slots, "Entity")
      });
      slots.push({
        key: "Name",
        value: getSlotValue(req.slots, "Name")
      });
      const intentHandler = new InventoryItemUpdateStatusIntentHandler(req.application, req.user, userId, slots, inventoryItemStatusTypes.CHECK_IN);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "InventoryCheckinIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  SetInventoryItemStatus: (req,  res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const slots = [];
      slots.push({
        key: "Entity",
        value: getSlotValue(req.slots, "Entity")
      });
      slots.push({
        key: "InventoryAmount",
        value: getSlotValue(req.slots, "InventoryAmount")
      });
      const intentHandler = new InventoryItemAmountStatusIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "InventoryAmountIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  GetInventoryAmountSummary: (req, res) => {
    return new Promise((resolve, reject) => {
      log("Inventory Amount Status Summary");

      const userId = req.data.session.user.userId;
      const slots = [];
      const intentHandler = new InventoryAmountStatusSummaryIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "InventoryAmountSummaryIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  SubtractInventoryItemAmount: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const slots = [];
      slots.push({
        key: "Entity",
        value: getSlotValue(req.slots, "Entity")
      });
      slots.push({
        key: "Amount",
        value: getSlotValue(req.slots, "Amount")
      });
      slots.push({
        key: "Units",
        value: getSlotValue(req.slots, "Units")
      });
      const intentHandler = new UpdateInventoryItemAmountIntentHandler(req.application, req.user, userId, slots, "Subtract");

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "SubtractInventoryItemAmount";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  AddInventoryItemAmount: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const slots = [];
      slots.push({
        key: "Entity",
        value: getSlotValue(req.slots, "Entity")
      });
      slots.push({
        key: "Amount",
        value: getSlotValue(req.slots, "Amount")
      });
      slots.push({
        key: "Units",
        value: getSlotValue(req.slots, "Units")
      });
      const intentHandler = new UpdateInventoryItemAmountIntentHandler(req.application, req.user, userId, slots, "Add");

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "SubtractInventoryItemAmount";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  GetNEBInventoryLookupResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      log("NEB Inventory Lookup Response");

      const userId = req.data.session.user.userId;
      const slots = [];
      const intentHandler = new NEBInventoryItemLookupIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "InventoryAmountSummaryIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  GetNEBInventoryCheckoutResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      log("NEB Inventory Checkout Response");

      const userId = req.data.session.user.userId;
      const slots = [];
      const intentHandler = new NEBInventoryCheckoutIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "InventoryItemCheckoutStatusIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
};

module.exports = AlexaInventoryController;
