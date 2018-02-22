import AbstractIntentHandler  from '../plugins/abstract/abstract.intent_handler';

import GoogleResponseHandler from '../managers/google.response_handler';

import OAuthToken from '../models/oauth_token';

import * as intentTypes from '../models/types/intentTypes';
import * as contextTypes from '../models/types/contextTypes';

function pre(req, res) {
  return new Promise((resolve,reject) => {
    if(req.body.originalRequest
      && req.body.originalRequest.data
      && req.body.originalRequest.data.user) {
      const accessToken = req.body.originalRequest.data.user.accessToken;

      OAuthToken.getUser(accessToken)
      .then((user) => {
        req.user = user;

        resolve();
      })
      .catch((err) => {
        reject(err);
      })
    } else {
      resolve();
    }
  });
}
function handleIntent(req, res) {
  let intentHandler;
  let intentName;
  const userId = "1";

  switch(req.intent) {
  case "AbstractIntent":
    intentHandler = new AbstractIntentHandler(req.application, req.user, userId, false, false, false, false, []);
    intentName = intentTypes.ABSTRACT;

    break;
  case "CalculationIntent":
    //TODO: Add implementation for calculation intent
    break;
  case "CancelIntent":
    //TODO: Add implementation for cancel protocol
    break;
  case "CompleteProtocolIntent":
    //TODO: Add implementation for complete protocol
    break;
  case "HelpIntent":
    //TODO: Add implmentation for Help
    break;
  case "IntroductionIntent":
    //TODO: Add implementation for INTRODUCTION
    break;
  case "InventoryAmountIntent":
    break;
  case "InventoryAmountStatusSummaryIntent":
    break;
  case "InventoryCheckinIntent":
    break;
  case "InventoryCheckoutIntent":
    break;
  case "InventoryCheckoutStatusIntent":
    break;
  case "InventoryItemLocationIntent":
    break;
  case "TellJokeIntent":
    break;
  case "LaunchIntent":
    break;
  case "OrderIntent":
    break;
  case "OrderSummaryIntent":
    break;
  case "PageIntent":
    break;
  case "ProtocolIntent":
    break;
  case "ProtocolStepIntent":
    //TODO: Do we need this??
    break;
  case "ProtocolPropertyIntent":
    break;
  case "QuoteIntent":
    break;
  case "RecipeIntent":
    break;
  case "RecordNoteIntent":
    break;
  case "ResetIntent":
    break;
  case "StopIntent":
    break;
  case "ThanksIntent":
    break;
  case "VideoIntent":
    break;
  case "WhatsNewIntent":
    break;
  case "WhoAmIIntent":
    break;
  default:
      return resolve(res.status(500).json({error: `I don't know how to handle the intent ${intent}`}));
  }
  intentHandler.fulfillIntent((err, response) => {
    if(err) { return reject(err); }

    response.intentName = intentName;
    const responseHandler = new GoogleResponseHandler(response);

    resolve(responseHandler.handleResponse());
  });
}
const GoogleController = {
  ProcessRequest: (req, res, next) => {
    const intent = req.body.result.metadata.intentName;

    req.intent = intent;

    pre(req, res)
    .then(() => {
      handleIntent(req, res);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({error: "Sorry, something bad happened" + err});
    })
  }
};

module.exports = GoogleController;
