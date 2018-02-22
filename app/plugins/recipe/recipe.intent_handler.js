import Entity from '../../models/entity';
import Repository from '../../models/repository';
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

class RecipeIntentHandler extends IntentBaseManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.RECIPE, contextTypes.RECIPE, slots);

    this.slotDefinitions.push({
      key: "RecipeName",
      required: true,
      missingPrompt: "What solution are you making?",
      missingReprompt: "Say the solution name again.",
      invalidPrompt: "I don't know the recipe for that soltion? Can you try again?",
      invalidReprompt: "Say the solution name again."
    });
  }
  validateSlots() {
    return new Promise((resolve, reject) => {
      console.log(`[Recipe IntentHelper] Validating Slots`);

      super.validateSlots()
      .then((response) => {
        this.entityName = this.getSlotValue("RecipeName");

        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  validateEntity() {
    return new Promise((resolve, reject) => {
      console.log(`[Recipe IntentHelper] Validating Entities`);

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
          const prompt = "I'm not sure about that solution.  Can you say the name again?";
          const reprompt = "Say the solution name again.";

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
  getRepository(entityType) {
    return new Promise((resolve, reject) => {
      Repository.findOne({
        entity_type: entityTypes.RECIPE,
        owner: this.application.owner
      })
      .then((repository) => {
        if(!repository) { return reject(new Error(`Repository Not Found ${entityTypes.RECIPE} for ${this.application.owner}`)); }

        this.repository = repository;

        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  getResponsePrompt() {
    return new Promise((resolve, reject) => {
      console.log(`[Recipe IntentHelper] Getting Response Prompt`);

      let prompt = '';

      prompt = 'The ingredients for ' + this.entity.name + ' are ';

      _.each(this.entity.attributes.ingredients, (ingredient) => {
        prompt += `<break time="0.5s" />${ingredient.name}`;
      });
      if (this.entity.attributes.instructions) {
        prompt += '<break time="0.5s" />';
        prompt += 'Finally, ' + this.entity.attributes.instructions + '.';
      }

      const response = new IntentResponse();

      response.response_type = "Prompt";
      response.prompt = prompt;
      response.reprompt = null;
      response.slotName = null;
      response.clearIntent = false;
      response.hintText = null;

      if(this.entity.attributes.ingredients && this.entity.attributes.ingredients.length > 0) {
        const listItems = [];
        _.each(this.entity.attributes.ingredients, (ingredient) => {
          listItems.push({
            primary_text: ingredient
          });
        });
        response.listTemplate = {
          token: this.entity._id,
          name: this.entity.name,
          items: listItems
        };
      }

      return resolve(response);
    });
  }
};

export default RecipeIntentHandler;
