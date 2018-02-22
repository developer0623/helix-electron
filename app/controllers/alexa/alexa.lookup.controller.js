import DeviceHelper from './device_helper';
import PubChemService from '../../../services/pubchem.service';

import KnowledgeBaseIntentHandler from '../../plugins/knowledge_base/knowledge_base.intent_handler';
import PubChemKnowledgeBaseIntentHandler from '../../plugins/knowledge_base/pub_chem.knowledge_base.intent_handler';
import AlexaResponseHandler from '../../managers/alexa.response_handler';

import Entity from '../../models/entity';

import _ from 'lodash';

const pluginMappings = {
  'PubChemKnowledgeBaseIntentHandler': PubChemKnowledgeBaseIntentHandler,
};
function getImageObject(knowledgeBaseItem) {
  let imageUrl = _.find(knowledgeBaseItem.properties, { key: "ImageUrl" });

  if(imageUrl  && imageUrl.value) {
    const object = {
      "contentDescription": knowledgeBaseItem.item_name,
      "sources": [
        {
          "url":  imageUrl.value
        }
      ]
    };

    return object;
  } else {
    if(knowledgeBaseItem.owner
      && knowledgeBaseItem.owner.logo) {
      const object = {
        "contentDescription": knowledgeBaseItem.owner.name,
        "sources": [
          {
            "url":  knowledgeBaseItem.owner.logo
          }
        ]
      };

      return object;
    }
  }

  return;
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
function getIntentHandler(company, slots) {
  return new Promise((resolve, reject) => {
    const entityName = _.find(slots, { "key": "Entity"} ).value;

    Entity.findOne({
      name_lower: (entityName) ? entityName.toLowerCase() : null,
      owner: company
    })
    .populate('repository')
    .exec()
    .then((entity) => {
      let intentHandler = KnowledgeBaseIntentHandler;

      if(entity  && entity.repository && entity.repository.plugin_classname) {
        intentHandler = pluginMappings[entity.repository.plugin_classname];
      }

      resolve(intentHandler);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
const AlexaLookupController =  {
  GetLookupResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      const slots = [];
      slots.push({
        key: "Entity",
        value: getSlotValue(req.slots, "Entity")
      });
      slots.push({
        key: "Property",
        value: getSlotValue(req.slots, "Property")
      });
      slots.push({
        key: "LookUpQualifier",
        value: getSlotValue(req.slots, "LookUpQualifier")
      });

      getIntentHandler(req.application.owner, slots)
      .then((IntentHandlerClass) => {
        const userId = req.data.session.user.userId;

        const intentHandler = new IntentHandlerClass(req.application, req.user, userId, slots);

        intentHandler.fulfillIntent((err, response) => {
          if(err) { return reject(err); }

          response.intentName = "LookUpIntent";
          const alexaResponseHandler = new AlexaResponseHandler(response);

          resolve(alexaResponseHandler.handleResponse(req, res));
        });
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
}

module.exports = AlexaLookupController;
