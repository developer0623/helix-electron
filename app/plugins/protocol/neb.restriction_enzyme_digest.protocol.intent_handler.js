import Entity from '../../models/entity';
import _ from 'lodash';

import * as intentTypes from '../../models/types/intentTypes';
import * as contextStatusTypes from '../../models/types/userContextStatusTypes';
import * as contextTypes from '../../models/types/contextTypes';
import * as entityTypes from '../../models/types/entityTypes';
import ProtocolManager from './protocol.intent_handler';

function missingProtocolType() {
  const prompt = 'Are you doing a single or double enzyme digest?';
  const slotName = "ProtocolType";

  const result = {
    elicitSlot: {
      slotName: slotName,
      prompt: prompt
    }
  };

  return result;
}
function missingFirstEnzyme(protocolType) {
  let prompt = 'Ok. What is your enzyme?';
  if(protocolType == 'double') {
    prompt = 'Ok.  What is your first enzyme?';
  }
  const slotName = "FirstEnzyme";

  const result = {
    elicitSlot: {
      slotName: slotName,
      prompt: prompt
    }
  };

  return result;
}
function missingSecondEnzyme() {
  const prompt = 'Ok. What is your second enzyme?';
  const slotName = "SecondEnzyme";

  const result = {
    elicitSlot: {
      slotName: slotName,
      prompt: prompt
    }
  };

  return result;
}
function invalidProtocolName() {
  const prompt = 'Hmm, I\'m not sure I know that digest.  Can you say the name of the protocol again?';
  const slotName = "ProtocolName";

  const result = {
    elicitSlot: {
      slotName: slotName,
      prompt: prompt,
      clearIntent: true
    }
  };

  return result;
}
class NEBRestrictionEnzymeDigestProtocolPlugIn extends ProtocolManager {
  constructor(application, user, userId, slots) {
    super(application, user, userId, intentTypes.PROTOCOL, contextTypes.PROTOCOL, slots);

    this.slotDefinitions.push({
      key: "ProtocolType",
      required: true,
      missingPrompt: "Are you doing a single or double enzyme digest?",
      missingReprompt: "Say single or double.",
      invalidPrompt: "I don't know that digest type. Can you try again?",
      invalidReprompt: "Say the protocol name again."
    });
    this.slotDefinitions.push({
      key: "FirstEnzyme",
      required: true,
      missingPrompt: "Ok. What is your enzyme?",
      missingReprompt: "Say the name of your enzyme.",
      invalidPrompt: "I don't recognize that enzyme? Can you say the enzyme name again?",
      invalidReprompt: "Say the enzyme again."
    });
    this.slotDefinitions.push({
      key: "SecondEnzyme",
      required: false,
      missingPrompt: "Ok. What is your second enzyme?",
      missingReprompt: "Say the name of your second enzyme.",
      invalidPrompt: "I don't recognize that enzyme? Can you say the enzyme name again?",
      invalidReprompt: "Say the enzyme again."
    });
  }
  validateEntity() {
    return new Promise((resolve, reject) => {
      console.log("[NEB Restrition Enzyme] Validating Restriction Enzyme Digest");

      let protocolName;
      const protocolType = this.getSlotValue("ProtocolType");
      let firstEnzyme = this.getSlotValue("FirstEnzyme");
      let secondEnzyme = this.getSlotValue("SecondEnzyme");

      switch(protocolType) {
        case "single":
          protocolName = `restriction enzyme digest with ${firstEnzyme}`;

          break;
        case "double":
          protocolName = `restriction enzyme digest with ${firstEnzyme} and ${secondEnzyme}`;

          break;
        default:
          resolve(missingProtocolType());
      }
      Entity.findOne({
        name_lower: `${protocolName.toLowerCase()}`,
        owner: `${this.application.owner}`
      })
      .then((entity) => {
        if(entity) {
          this.entity = entity;
          this.entityName = entity.name;

          resolve();
        } else {
          resolve(invalidProtocolName());
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

export default NEBRestrictionEnzymeDigestProtocolPlugIn;
