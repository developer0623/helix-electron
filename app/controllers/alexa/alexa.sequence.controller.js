import stringSimilarity from 'string-similarity';
import _ from 'lodash';

const TEMPERATURE = "temperature";
const TIME = "duration";
const QUANTITY = "quantity";

import AlexaProtocolController from './alexa.protocol.controller';

function getNextPrompt(request) {
  return new Promise((resolve, reject) => {
    const response = AlexaProtocolController.GetNextStepResponse(request, response);
  });
}
function getPreviousPrompt(request) {
  return new Promise((resolve, reject) => {

    const helixSession = request.helixSession;

    if(!helixSession) { reject(new Error("No Session Found")); }

    const attributes = helixSession.attributes;

    if(!attributes) { reject(new Error("No Attributes Found")); }
    if(!attributes.protocol) { reject(new Error("Protocol Not Found")); }
    if(!attributes.step) { reject(new Error("Last Step Not Found")); }

    let prompt = '';
    const protocol = attributes.protocol;
    const previousStep = attributes.step - 1;

    if(previousStep < 1) {
      prompt += 'I\'m sorry, we\'re at the first step.  I can go to the next step if you need.';

      resolve(prompt);
    } else {
      prompt += 'The previous step is ';
      prompt += '<break time="0.5s" />';
      prompt += protocol.steps[previousStep-1].name

      request.attributes = {
        protocol: protocol,
        step: previousStep
      }
      resolve(prompt);
    }
  });
}
function getRepeatPrompt(request) {
  return new Promise((resolve, reject) => {
    const helixSession = request.helixSession;

    if(!helixSession) { reject(new Error("No Session Found")); }

        if(helixSession.steps && helixSession.steps.length > 0) {
          prompt += 'Here\'s the step again.';
          prompt += '<break time="0.5s" />';
          prompt += helixSession.steps[helixSession.last_step-1].name;
        } else {
          prompt += helixSession.last_response;
        }

    let prompt = '';

    if(!attributes) { reject(new Error("No Attributes Found")); }
    if(!attributes.protocol) { reject(new Error("Protocol Not Found")); }
    if(!attributes.step) { reject(new Error("Step Not Found")); }

    const protocol = attributes.protocol;
    const step = attributes.step;

    prompt += 'Ok. Here\'s the step again...';
    prompt += '<break time="0.5s" />';
    prompt += protocol.steps[step-1].name;

    request.attributes = {
      protocol: protocol,
      step: step
    }

    resolve(prompt);
  });
}

function GetElementPropertyPrompt(request) {
  return new Promise((resolve, reject) => {
    const accessToken = request.data.session.user.accessToken;

    HelixSession.getLastHelixSession(accessToken, "ProtocolIntent")
    .then((helixSession) => {
      var prompt = '';
      const entityName = request.slot('ENTITY');

      if(helixSession.steps && helixSession.steps.length > 0) {

        prompt += getElementProperty(entityName, TEMPERATURE, helixSession);

      } else {
        prompt += helixSession.last_response;
      }

        resolve([true, prompt, helixSession.last_step, helixSession.steps]);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function getDurationPrompt(request) {
  return new Promise((resolve, reject) => {
    const accessToken = request.data.session.user.accessToken;

    HelixSession.getLastHelixSession(accessToken, "ProtocolIntent")
    .then((helixSession) => {
      var prompt = '';
      const entityName = request.slot('ENTITY');

      if(helixSession.steps && helixSession.steps.length > 0) {

        prompt += getElementProperty(entityName, TIME, helixSession);

      } else {
        prompt += helixSession.last_response;
      }

        resolve([true, prompt, helixSession.last_step, helixSession.steps]);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getElementQuantityPrompt(request) {
  return new Promise((resolve, reject) => {
    const accessToken = request.data.session.user.accessToken;

    HelixSession.getLastHelixSession(accessToken, "ProtocolIntent")
    .then((helixSession) => {
      var prompt = '';
      const entityName = request.slot('ENTITY');

      if(helixSession.steps && helixSession.steps.length > 0 && entityName) {

        prompt += getElementProperty(entityName, QUANTITY, helixSession);

      } else {
        if(!entityName)
          prompt += "I'm sorry, I couldn't recognize what you want to know the quantity of.";
        else
          prompt += helixSession.last_response;
      }

        resolve([true, prompt, helixSession.last_step, helixSession.steps]);
      })
    .catch((err) => {
      reject(err);
    });
  });
}

/**
 * Helper function to find a property of an entity in a step.
 * If entity is not provided, function will return property for all entities in the step.
 * @param {string} entityName - Entity requested by the user
 * @param {string} propertyToFind - Property to find from the requested entity
 * @param {object} helixSession  - Session info of the user
 */
function getElementProperty(entityName, propertyToFind, helixSession)
{
  var prompt = "";
  var stepActions = helixSession.steps[helixSession.last_step-1].step_action;//Get the list of actions in current step in the protocol
  var found = false;//Indicates if the element was found
  var bestMatch = -1;//Contains the index of the best match
  var bestSimilarity = 0;//Contains the similarity of the best match
  propertyToFind = validatePropertyToFind(propertyToFind);
  if(stepActions)
  {
      for(var i = 0; i < stepActions.length; i++)//Loop over the elements in current step
      {
        var propertyFound = stepActions[i].properties.filter(function(prop) {
            return prop.name == propertyToFind;
          })[0];
        if(entityName)//The user indicated the entity to get property of
        {
          if(stepActions[i].element_name == entityName)//If the element is found
          {
            prompt += setPrompt(propertyToFind, propertyFound, entityName, stepActions[i].action_name, true);
            found = true;
            break;//No need to continue
          }
          else if(stepActions[i].element_name) //If not found yet, compute similarity of this element to requested element
          {
            var similarity = stringSimilarity.compareTwoStrings(stepActions[i].element_name, entityName);
            if(similarity > bestSimilarity)//Get the index of the element with highest similarity
            {
                bestMatch = i;
                bestSimilarity = similarity;
            }
          }
        }
        else//The user didn't indicate entity, so get property for all entities in this step.
        {
          var auxPrompt = setPrompt(propertyToFind, propertyFound, stepActions[i].element_name, stepActions[i].action_name, false, prompt);
          if(auxPrompt)
          {
            prompt += auxPrompt + '<break time="0.5s" />';
            found = true;
          }
        }
      }
      if(!found)//If it wasn't found,
      {
        var propertyFound = "";
        var element_name = entityName || "";
        var step_action = "";
        if(entityName && bestSimilarity >= 0.5) // AND user indicated entityName, then use best match (Using 0.5 to test similarity).
        {
            propertyFound = stepActions[bestMatch].properties.filter(function(prop) {
              return prop.name == propertyToFind;
            })[0];
            element_name = stepActions[bestMatch].element_name;
            step_action = stepActions[bestMatch].action_name;
            prompt = "I think you meant "+ element_name + ' <break time="0.5s" /> ';
        }
        prompt += setPrompt(propertyToFind, propertyFound, element_name, step_action, entityName);
      }
  }
  else
  {
    prompt = "I'm sorry, I couldn't recognize " + propertyToFind + " in this step.";
  }
  return (_.isEmpty(prompt) ? "I'm sorry, I couldn't recognize " + propertyToFind + " in this step." : prompt);
}

/**
 * Function returns unique value for possible synonyms of property
 */
function validatePropertyToFind(propertyToFind)
{
  if(propertyToFind == "how much")
    return QUANTITY;
  if(propertyToFind == "how long")
    return TIME;
  return propertyToFind;
}

/**
 * Function to find a specific property item from properties array in step_action
 */
function getPropertyFromStepAction(properties, propertyToFind)
{
  return properties.filter(function(prop) {
    return prop.name == propertyToFind;
  });
}
/**
 * Function creates prompt message for user, given requested property, value found and element name
 * @param {string} propertyToFind
 * @param {string} propertyFound - Property information found in the step action array
 * @param {string} entityName - Entity requested by the user to find its property (duration, temperature or quantity)
 * @param {string} action_name - Action to be performed in the step
 * @param {boolean} entityNameGiven - Indicates if the user gave the entity name or not
 * @param {string} currentPrompt - Current prompt, used to avoid repeating "you'll need" at every entity
 */
function setPrompt(propertyToFind, propertyFound, entityName, action_name, entityNameGiven, currentPrompt)
{
  var prompt = "";
  if(propertyFound)
  {
    if(propertyToFind == QUANTITY)
    {
      var quantityStr = propertyFound.amount + " " + (propertyFound.unit || "");//Create string for response
      prompt = (_.isEmpty(currentPrompt) ? "You'll need " : "") + quantityStr +  " of " + entityName;
    }
    else if(propertyToFind == TIME)
    {
      var quantityStr = " " + propertyFound.amount + " " + (propertyFound.unit || "");//Create string for response
      prompt = (_.isEmpty(action_name) ? "" : action_name + " for ") + quantityStr;
    }
    else if(propertyToFind == TEMPERATURE)
    {
      var quantityStr = propertyFound.amount + " degrees " + (propertyFound.unit || "");//Create string for response
      prompt = (_.isEmpty(entityName) ? "Temperature must be " : entityName + " must be at ") + quantityStr;
    }
  }
  else if(entityNameGiven)
  {
    prompt = "I'm sorry I don't have "+ propertyToFind +" information" + (entityName? " for " + entityName : "");
  }
  return prompt;
}

const AlexaSequenceController = {
  GetRepeatResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      AlexaProtocolController.GetRepeatResponse(req, res)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  GetNextResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      AlexaProtocolController.GetNextStepResponse(req, res)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  GetPreviousResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      AlexaProtocolController.GetPreviousStepResponse(req, res)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  GetElementPropertyResponse: (req, res) => {
    return new Promise((resolve, reject) => {
      GetElementPropertyPrompt(req)
      .then((items) => {
        const success = items[0];
        const prompt = items[1];
        const step = items[2];
        const steps = items[3];
        const reprompt = null;

        AlexaHelper.sendResponse(req, res, prompt, reprompt, success, true, step, steps)
        .then((response) => {
           resolve(response);
         })
         .catch((err) => {
           console.log(err);
           reject(err);
         });
      })
      .catch((err) => {
        console.log("Error Getting Property of Entity " + err);

        const prompt = 'Sorry, an error occurred getting the property.'
        const reprompt = null;

        AlexaHelper.sendResponse(req, res, prompt, reprompt, false, true, null, null)
        .then((response) => {
           resolve(response);
         })
         .catch((err) => {
           console.log(err);
           reject(err);
         });
      });
    });
  }
}

module.exports = AlexaSequenceController;
