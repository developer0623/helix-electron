import Entity from '../../models/entity';
import Repository from '../../models/repository';
import UserContext from '../../models/user_context';

import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import _ from 'lodash';
import compile from 'es6-template-strings/compile';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';

class KnowledgeBaseIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.KNOWLEDGE_BASE, contextTypes.KNOWLEDGE_BASE, slots);

    this.property;
    this.result;
    this.slotDefinitions.push({
      key: "Entity",
      required: true,
      missingPrompt: "I didn't quite get that.  What are you looking for again?",
      missingReprompt: "Say what you are looking for again..",
      invalidPrompt: "I don't know about that? Can you try again?",
      invalidReprompt: "Say the name again."
    });
    this.slotDefinitions.push({
      key: "Property",
      required: true,
      missingPrompt: "Which property?",
      missingReprompt: "Say the property name for again..",
      invalidPrompt: "I'm not sure about that? Can you try again?",
      invalidReprompt: "Say that again."
    });
    this.slotDefinitions.push({
      key: "LookupQualifier",
      required: false,
      invalidPrompt: "I'm not sure about that? Can you try again?",
      invalidReprompt: "Say that again."
    });
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[KnowledgeBase IntentHandler] Validating Slots`);

      super.validateSlots()
      .then((response) => {
        this.entityName = this.getSlotValue("Entity");

        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  validateEntity() {
    return new Promise((resolve, reject) => {
      console.log(`[KnowledgeBase IntentHandler] Validating Entities ${this.entityName}`);

      let propertyName = this.getSlotValue("Property");
      const lookupQualifier = this.getSlotValue("LookUpQualifier");

      if(lookupQualifier) {
        propertyName = `${lookupQualifier} ${propertyName}`;
      }

      Entity.findOne({
        name_lower: `${this.entityName.toLowerCase()}`
      })
      .then((entity) => {
        if(entity) {
          console.log(`[KnowledgeBase IntentHandler] Entity Found`);

          this.entity = entity;

          return Repository.findById(entity.repository);
        } else {
          console.log(`[KnowledgeBase IntentHandler] Entity Not Found`);

          const response = new IntentResponse();

          const prompt = "What are you looking for?";
          const reprompt = "Say the name of what you are looking for again.";

          response.elicitSlot = {
            slotName: "Entity"
          }
          response.prompt = prompt;
          response.reprompt = reprompt;
          response.slotName = null;
          response.clearIntent = false;

          resolve(response);
        }
      })
      .then((repository) => {
        if(repository && repository.attributes && repository.attributes.properties) {
          console.log(`[KnowledgeBase IntentHandler] Finding Property ${propertyName.toLowerCase() in Repository}`);

          const lookupProperty = _.find(repository.attributes.properties, { "name_lower": propertyName.toLowerCase() });

          if(lookupProperty) {
            this.property = lookupProperty;
            
            console.log(`[KnowledgeBase IntentHandler] Looking Up Property ${lookupProperty.name_lower}`);
            console.log(JSON.stringify(this.entity.attributes));
            let result;
            if(this.entity.attributes && this.entity.attributes.properties) {
              result = _.find(this.entity.attributes.properties, { key: `${lookupProperty.name_lower}` });
            }

            if(result) {
              console.log(`[KnowledgeBase IntentHandler] Found Result ${result}`);

              this.result = result;

              resolve();
            } else {
              console.log(`[KnowledgeBase IntentHandler] Unable to Find Result`);

              const response = new IntentResponse();
              const prompt = "Hmm.  I'm not sure about that.  Can you try again?";
              const reprompt = "Try again.";

              response.response_type = "Prompt";
              response.prompt = prompt;
              response.reprompt = reprompt;
              response.slotName = null;
              response.clearIntent = true;

              resolve(response);
            }
          } else {
            const response = new IntentResponse();
            const prompt = "Which property?";
            const reprompt = "Say the name of what you are looking for again.";


            response.response_type = "Prompt";
            response.prompt = prompt;
            response.reprompt = reprompt;
            response.slotName = null;
            response.clearIntent = false;

            resolve(response);
          }
        } else {
          const response = new IntentResponse();
          const prompt = "Which property?";
          const reprompt = "Say the name of what you are looking for again.";


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
      });
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[KnowledgeBase IntentHandler] Getting Response Prompt`);

      let prompt = '';
      let display = '';

      if(this.result.value.toLowerCase() == 'no'
        && this.property.negative_response_format) {
        const compiled = compile(this.property.negative_response_format);

        prompt += resolveToString(compiled, { sayAsEntity: this.entity.say_as });
        display += resolveToString(compiled, { sayAsEntity: this.entity.name });
      } else if(this.property.response_format) {
        const compiled = compile(this.property.response_format);

        prompt += resolveToString(compiled, { sayAsEntity: this.entity.say_as, propertyValue: this.result.value });
        display += resolveToString(compiled, { sayAsEntity: this.entity.name });
      } else {
        prompt += `The ${this.sayPropertyAs()}  of ${this.sayEntityAs()} is ${this.sayValueAs(this.property.name, this.result.value)}`;
        display += `The ${this.property.name} of ${this.entity.name} is ${this.result.value}`;
      }

      const reprompt = "What else can I lookup for you?";

      const response = new IntentResponse();

      response.bodyTemplate =  {
        token: this.entity._id,
        title: this.entity.name,
        primary_text: display
      }
      response.prompt = prompt;
      response.reprompt = reprompt;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = "Ask me another property?";

      return resolve(response);
    });
  }
  displayPropertyAs() {
    let displayAs = this.property.display_as || this.property.name;

    return displayAs;
  }
  displayEntityAs() {
    return this.entity.name;
  }
  sayPropertyAs() {
    let sayAs = this.property.say_as || this.property.name;

    return sayAs;
  }
  sayEntityAs() {
    let sayAs = this.entity.say_as || this.entity.name;

    return sayAs;
  }
  sayValueAs() {
    let sayAs = "";

    switch(this.property.name) {
    case propertyTypes.CAS:
      const parts = this.result.value.split('-');

      let index = parts.length - 1;
      _.each(parts, (part) => {
        sayAs += `<say-as interpret-as="digits">${part}</say-as>`;
        if(index > 0) {
          sayAs += '-';
        }
        index -=1;
      })
      break;
    case propertyTypes.MOLECULAR_FORMULA:
      sayAs = `<say-as interpret-as="characters">${this.result.value}</say-as>`;
      break;
    default:
      sayAs = this.result.value;
    }
    return sayAs;
  }
};

export default KnowledgeBaseIntentHandler;
