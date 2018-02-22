import AlexaLaunchController from './alexa/alexa.launch.controller';
import AlexaRecipeController from './alexa/alexa.recipe.controller';
import AlexaInventoryController from './alexa/alexa.inventory.controller';
import AlexaProtocolController from './alexa/alexa.protocol.controller';
import AlexaCalculationController from './alexa/alexa.calculation.controller';
import AlexaMassMolarityCalculatorController from './alexa/alexa.massmolaritycalculator.controller';
import AlexaLookupController from './alexa/alexa.lookup.controller';
import AlexaSequenceController from './alexa/alexa.sequence.controller'
import AlexaWhatsNewController from './alexa/alexa.whatsnew.controller';
import AlexaThanksController from './alexa/alexa.thanks.controller';
import AlexaNoteTakerController from './alexa/alexa.note_taker.controller';
import AlexaPageController from './alexa/alexa.page.controller';

import KnowledgeBaseIntentHandler  from '../plugins/knowledge_base/knowledge_base.intent_handler';
import AlexaResponseHandler from '../managers/alexa.response_handler';

import _ from 'lodash';

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
const AlexaController = {
  Launch: (req, res) => {
    return AlexaLaunchController.GetLaunchResponse(req, res);
  },
  GetRecipe: (req, res, callback) => {
    return AlexaRecipeController.GetRecipeResponse(req, res);
  },
  GetInventoryItemLocation: (req, res, callback) => {
    return AlexaInventoryController.GetInventoryItemLocation(req, res);
  },
	GetInventoryItemCASNumber: (req, res, callback) => {
		return AlexaInventoryController.GetInventoryItemCASNumber(req, res);
	},
  GetProtocol: (req, res, callback) => {
    return AlexaProtocolController.GetProtocolResponse(req, res);
  },
  GetCalculation: (req, res, callback) => {
    return AlexaCalculationController.GetCalculationResponse(req, res);
  },
  CalculateMassMolarity: (req, res, callback) => {
    return AlexaMassMolarityCalculatorController.GetMassMolarityResponse(req, res);
  },
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

      const userId = req.data.session.user.userId;
      const intentHandler = new KnowledgeBaseIntentHandler(req.application, req.user, userId, slots);

      intentHandler.fulfillIntent((err, response) => {
        if(err) { return reject(err); }

        response.intentName = "LookUpIntent";
        const alexaResponseHandler = new AlexaResponseHandler(response);

        resolve(alexaResponseHandler.handleResponse(req, res));
      });
    });
  },
  Repeat: (req, res, callback) => {
    return AlexaSequenceController.GetRepeatResponse(req, res);
  },
  Next: (req, res, callback) => {
    return AlexaSequenceController.GetNextResponse(req, res);
  },
  Back: (req, res, callback) => {
    return AlexaSequenceController.GetPreviousResponse(req, res);
  },
  GetWhatsNew: (req, res, callback) => {
    return AlexaWhatsNewController.GetWhatsNewResponse(req, res);
  },
  GetThanksResponse: (req, res, callback) => {
    return AlexaThanksController.GetThanksResponse(req, res);
  },
  RecordNote: (req, res, callback) => {
    return AlexaNoteTakerController.GetTakeNoteResponse(req, res);
  },
  Page: (req, res, callback) => {
    return AlexaPageController.Page(req, res);
  }

  ,GetElementPropertyResponse: (req, res, callback) => {
    return AlexaSequenceController.GetElementPropertyResponse(req, res);
  }
  ,FollowUpDoubleEnzymeProtocol: (req, res, callback) => {
    return AlexaProtocolController.FollowUpDoubleEnzymeProtocolResponse(req, res);
  }

};

module.exports = AlexaController;
