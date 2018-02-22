import OrderIntentHandler from '../../plugins/orders/order.intent_handler';
import OrderSummaryIntentHandler from '../../plugins/orders/order_summary.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import * as confirmationStatuses from './types/confirmationStatus';
import * as dialogStates from './types/dialogStates';

import _ from 'lodash';

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
const AlexaOrderController = {
  GetOrderRequestResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const slots = [];

      slots.push({
        key: "Entity",
        value: getSlotValue(req.slots, "Entity")
      });
      slots.push({
        key: "VendorName",
        value: getSlotValue(req.slots, "VendorName")
      });
      slots.push({
        key: "ItemSize",
        value: getSlotValue(req.slots, "ItemSize")
      });
      slots.push({
        key: "Quantity",
        value: getSlotValue(req.slots, "Quantity")
      });
      const intentConfirmation = req.confirmationStatus == confirmationStatuses.CONFIRMED;
      const dialog = req.getDialog();

      const intentHandler = new OrderIntentHandler(req.application, req.user, userId, intentConfirmation, dialog.isStarted(), dialog.isInProgress(), dialog.isCompleted(), slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "OrderIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  GetOrderSummaryResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const intentHandler = new OrderSummaryIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "OrderIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaOrderController;
