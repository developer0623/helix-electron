import Entity from '../../models/entity';
import UserContext from '../../models/user_context';

import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';
import * as entityTypes from '../../models/types/entityTypes';

import _ from 'lodash';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class ProtocolPropertyIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.PROTOCOLPROPERTY, contextTypes.PROTOCOL, slots, entityTypes.PROTOCOL);

    this.slotDefinitions.push({
      key: "ProtocolName",
      required: false,
    });
    this.slotDefinitions.push({
      key: "ProtocolProperty",
      required: true,
      missingPrompt: "I'm not sure which property you are looking for.  I can tell you the equipment or chemicals you'll need.'",
      missingReprompt: "Say equipment or chemicals.",
      invalidPrompt: "I don't know that property? Can you try again?",
      invalidReprompt: "Say equipment or chemicals.",
    });
  }
  getContext() {
    return new Promise((resolve, reject) => {
      console.log(`[Protocol Property IntentHandler] Get Context`);

      super.getContext()
      .then(() => {
        if(this.context && this.context.context && this.context.context.entityName) {
          this.entityName = this.context.context.entityName

          resolve();
        } else {
          reject(new Error("Protocol not found."));
        }
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
  validateEntity() {
    return new Promise((resolve, reject) => {
      console.log(`[Protocol Property IntentHandler] Validating Entities`);

      Entity.findOne({
        name_lower: `${this.entityName.toLowerCase()}`,
        owner: `${this.application.owner}`
      })
      .then((entity) => {
        if(entity) {
          this.entity = entity;

          resolve();
        } else {
          const response = new IntentResponse();
          const prompt = "I'm not sure about that protocol.  Can you say the name again?";
          const reprompt = "Say the protocol name again.";

          response.response_type = "Prompt";
          response.prompt = prompt;
          response.reprompt = reprompt;
          response.slotName = null;
          response.clearIntent = false;

          resolve(response);
        }
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Protocol Property IntentHandler] Getting Response Prompt`);

      let prompt;
      let reprompt;
      const property = this.getSlotValue("ProtocolProperty");
      const response = new IntentResponse();

      if(property.toLowerCase() == "equipment") {
        prompt = 'For the Synthesis of Acetaminophen, you’ll need a 5ml conical vial, a stir bar, micropipettes, Hirsch funnel, and spatulas.';
      } else {
        prompt = 'For the Synthesis of Acetaminophen, you’ll need Acetic Anhydride, Para-aminophenol, and Ethyl Acetate'
      }
      const listItems = [];
      if(property.toLowerCase() == "equipment") {
        listItems.push({
          primary_text: "5ml conical vial"
        });
        listItems.push({
          primary_text: "Stir bar"
        });
        listItems.push({
          primary_text: "Micropipettes"
        });
        listItems.push({
          primary_text: "Hirsch funnel"
        });
        listItems.push({
          primary_text: "Spatulas"
        });
      } else {
        listItems.push({
          primary_text: "Acetic anhydride"
        });
        listItems.push({
          primary_text: "Para-aminophenol"
        });
        listItems.push({
          primary_text: "Ethyl acetate"
        });
      }
      response.listTemplate = {
        token: this.entity._id,
        name: this.entity.name,
        items: listItems
      };

      response.prompt = prompt;
      response.reprompt = reprompt;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = "Ask me for the first step";

      return resolve(response);
    });
  }
};

export default ProtocolPropertyIntentHandler;
