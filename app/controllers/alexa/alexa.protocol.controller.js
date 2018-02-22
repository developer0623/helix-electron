import _ from 'lodash';

import ProtocolIntentHandler from '../../plugins/protocol/protocol.intent_handler';
import ProtocolStepIntentHandler from '../../plugins/protocol/protocol_step.intent_handler';
import ProtocolPropertyIntentHandler from '../../plugins/protocol/protocol_property.intent_handler';
import CompleteProtocolIntentHandler from '../../plugins/protocol/complete_protocol.intent_handler';
import NEBRestrictionEnzymeDigestPlugIn from '../../plugins/protocol/neb.restriction_enzyme_digest.protocol.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

function log(action) {
  console.log("Protocol: " + action)
}
function logError(error) {
  console.log("Error: " + error + ": " + error.stack);
}
let protocolManager;

function getSlotValue(slots, slotName) {
  const entitySlot = slots[slotName];

  if(!entitySlot) { return null; }

  const resolvedValues = entitySlot.resolvedValues();

  if(!_.isEmpty(resolvedValues)) {
    return resolvedValues[0];
  } else {
    return (entitySlot.value) ? entitySlot.value : null;
  }
}
function getImageObject(protocol) {

  if(!protocolManager.entity || !protocolManager.entity.owner) { return null; }

  const object = {
    "contentDescription": protocolManager.entity.owner.name,
    "sources": [
      {
        "url":  protocolManager.entity.owner.logo
      }
    ]
  };

  return object;
}
const AlexaProtocolController = {
  GetProtocolResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentName = "ProtocolIntent";
      const slots = [];
      slots.push({
        key: "ProtocolName",
        value: getSlotValue(req.slots, "ProtocolName")
      });
      slots.push({
        key: "ProtocolType",
        value: getSlotValue(req.slots, "ProtocolType")
      });
      slots.push({
        key: "FirstEnzyme",
        value: getSlotValue(req.slots, "FirstEnzyme")
      });
      slots.push({
        key: "SecondEnzyme",
        value: getSlotValue(req.slots, "SecondEnzyme")
      });

      const protocolNameSlot = _.find(slots, { key: "ProtocolName" });

      let intentHandler;
      if(protocolNameSlot.value  && protocolNameSlot.value.toLowerCase() == "restriction enzyme digest") {
        intentHandler = new NEBRestrictionEnzymeDigestPlugIn(req.application, req.user, userId, slots);
      } else {
        intentHandler = new ProtocolIntentHandler(req.application, req.user, userId, slots);
      }

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = intentName;
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  GetNextStepResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentName = "Amazon.Next";
      const slots = [];

      const intentHandler = new ProtocolStepIntentHandler(req.application, req.user, userId, slots, "NextStep");

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = intentName;
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  GetPreviousStepResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentName = "Amazon.Previous";
      const slots = [];

      const intentHandler = new ProtocolStepIntentHandler(req.application, req.user, userId, slots, "PreviousStep");

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = intentName;
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  GetRepeatResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentName = "Amazon.Next";
      const slots = [];

      const intentHandler = new ProtocolStepIntentHandler(req.application, req.user, userId, slots, "RepeatStep");

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = intentName;
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  GetProtocolPropertyResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentName = "ProtocolPropertyIntent";
      const slots = [];
      slots.push({
        key: "ProtocolProperty",
        value: getSlotValue(req.slots, "ProtocolProperty")
      });
      const intentHandler = new ProtocolPropertyIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = intentName;
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  GetCompleteProtocolResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const userId = req.data.session.user.userId;
      const intentName = "CompleteProtocolIntent";
      const slots = [];

      const intentHandler = new CompleteProtocolIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = intentName;
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaProtocolController;
