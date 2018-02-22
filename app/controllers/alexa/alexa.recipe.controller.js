import DeviceHelper from './device_helper';
import UserContex from '../../models/user_context';
import _ from 'lodash';

import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import RecipeIntentHandler  from '../../plugins/recipe/recipe.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

function log(action) {
  console.log("Recipe Controller: " + action)
}
function logError(error) {
  console.log("Error: " + error + ": " + error.stack);
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
const AlexaRecipeController = {
  GetRecipeResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      log("Getting Recipe Response");

      const userId = req.data.session.user.userId;
      const slots = [];
      slots.push({
        key: "RecipeName",
        value: getSlotValue(req.slots, "RecipeName")
      });
      const intentHandler = new RecipeIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "RecipeIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  }
}

module.exports = AlexaRecipeController;
