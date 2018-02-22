import Entity from '../../models/entity';
import UserContext from '../../models/user_context';

import PubChemService from '../../../services/pubchem.service';

import * as propertyTypes from '../../models/types/propertyTypes';
import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';

import _ from 'lodash';
import compile from 'es6-template-strings/compile';
import resolveToString from 'es6-template-strings/resolve-to-string';

import IntentBaseManager from '../intent_base.manager';
import IntentResponse from '../../managers/intent_response';
import KnowledgeBaseIntentHandler from './knowledge_base.intent_handler';

class PubChemKnowledgeBaseIntentHandler extends KnowledgeBaseIntentHandler {
  constructor(application, user, userId, slots) {
    super(application, user, userId, slots);

    let formalName;
    let value;
    let resultType;
  }
  validateEntity() {
    return new Promise((resolve, reject) => {
      console.log(`[PubChem KnowledgeBase IntentHandler] Validating Entities ${this.entityName}`);

      let propertyName = this.getSlotValue("Property");
      const lookupQualifier = this.getSlotValue("LookUpQualifier");

      if(lookupQualifier) {
        propertyName = `${lookupQualifier} ${propertyName}`;
      }

      Entity.findOne({
        name_lower: `${this.entityName.toLowerCase()}`,
        owner: `${this.application.owner}`
      })
      .then((entity) => {
        this.entity = entity;

        let hasProperties = false;
        if(this.entity && this.entity.attributes && this.entity.attributes.properties) {
          hasProperties = this.entity.attributes.properties.length > 0;
        }
        if(!hasProperties) {
          PublishManager.queueMessage({
            entityName: resolvedEntityName
          }, queues.PUBCHEM_QUEUE );

          PubChemService.LookupProperty(this.entityName, propertyName)
          .then((results) => {
            if(results) {
              this.property = {
                name: propertyName
              }
              this.result = {
                value: results[1]
              }
            }
            resolve();
          })
          .catch((err) => {
            const response = new IntentResponse();
            const prompt = "Hmm.  I'm not sure about that.  Can you try again?";
            const reprompt = "Try again.";

            response.response_type = "Prompt";
            response.prompt = prompt;
            response.reprompt = reprompt;
            response.slotName = null;
            response.clearIntent = true;

            resolve(response);
          });
        } else {
          let result;
          if(entity.attributes && entity.attributes.properties) {
            result = _.find(entity.attributes.properties, { key: `${this.property.name_lower}` });
          }

          if(result) {
            this.result = result;

            resolve();
          } else {
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
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
};

export default PubChemKnowledgeBaseIntentHandler;
