import config from '../../src/config';
import connections from '../../src/connection';
import EventEmitter from 'events';

import _ from 'lodash';
import async from 'async';
import Repository from '../../app/models/repository';
import Entity from '../../app/models/entity';
import Intent from '../../app/models/intent';

function removeRomanNumeral(entity, romanNumeralToReplace, replacementValue) {
  const startIndex =  entity.lastIndexOf('(');
  const endIndex = entity.lastIndexOf(')');

  if(startIndex > -1 && endIndex > -1) {
    const start = entity.substring(0, startIndex);
    const end = entity.substring(endIndex+1);
    const middle = entity.substring(startIndex + 1, endIndex).toLowerCase();

    const replaceValues = [romanNumeralToReplace];
    const replaceWithValues =[replacementValue];

    if(_.includes(replaceValues, middle)) {
      const replaceIndex = _.indexOf(replaceValues, middle);
      const replaceWithValue = replaceWithValues[replaceIndex];

      entity = `${start} ${replaceWithValue}${end}`;
    }
  }

  return entity;
}
function cleanse(entity) {
  entity = removeRomanNumeral(entity, "vi", "6");
  entity = removeRomanNumeral(entity, "v", "5");
  entity = removeRomanNumeral(entity, "iv", "4");
  entity = removeRomanNumeral(entity, "iii", "3");
  entity = removeRomanNumeral(entity, "ii", "2");
  entity = removeRomanNumeral(entity, "i", "1");
  entity = entity.replace("\n", " ")
    .replace(".", " Point")
    .replace("-", " ")
    .replace("%", " Percent")
    .replace("α", "Alpha")
    .replace("β", "Beta")
    .replace("γ", "Gamma")
    .replace(/["']/g, "")
    .replace(/[^0-9a-z]/gi, ' ');

  return entity;
}

function buildBuiltInIntents() {
  return new Promise((resolve, reject) => {
    const results = [];

    Intent.find({
      is_built_in: true
    })
    .then((intents) => {
      _.each(intents, (intent) => {
        const json = {};
        const samples = [];
        const slotsArray = [];

        json["name"] = `${intent.name}`;
        _.each(intent.samples, (sample) => {
          samples.push(sample);
        })
        json["samples"] = samples;
        _.each(intent.slots, (slot) => {
          const slotJson = {
            "name": slot.name,
            "type": slot.custom_slot_type.name,
            "samples": []
          };
          _.each(slot.utterances, (utterance) => {
            slotJson.samples.push(utterance);
          });
          slotsArray.push(slotJson);
        })
        if(slotsArray.length > 0) {
          json["slots"] = slotsArray;
        }
        results.push(json);
      });

      resolve(results);
    })
    .catch((err) => {
      reject(err);
    })
  });
}
function buildCustomIntents(repositories) {
  return new Promise((resolve, reject) => {
    const results = [];

    _.each(repositories, (repository) => {
      _.each(repository.repository_type.intents, (intent) => {
        const json = {};
        const samples = [];
        const slotsArray = [];

        if(!_.find(results, { "name": `${intent.name}`})) {
          json["name"] = `${intent.name}`;
          _.each(intent.samples, (sample) => {
            samples.push(sample);
          })
          json["samples"] = samples;
          _.each(intent.slots, (slot) => {
            const slotJson = {
              "name": slot.name,
              "type": slot.custom_slot_type.name,
              "samples": []
            };
            _.each(slot.utterances, (utterance) => {
              slotJson.samples.push(utterance);
            });
            slotsArray.push(slotJson);
          })
          if(slotsArray.length > 0) {
            json["slots"] = slotsArray;
          }
          results.push(json);
        }
      });
    });

    resolve(results);
  });
}

function buildIntents(repositories) {
  return new Promise((resolve, reject) => {
    const results = [];

    console.log("Building Intents");

    async.parallel([
      (callback) => {
        buildBuiltInIntents()
        .then((intents) => {
          callback(null, intents);
        })
        .catch((err) => {
          callback(err);
        })
      },
      (callback) => {
        buildCustomIntents(repositories)
        .then((intents) => {
          callback(null, intents);
        })
        .catch((err) => {
          callback(err);
        })
      }
    ], (err, results) => {
      if(err) { return reject(err); }

      const intentResults = _.concat(results[0], results[1]);

      resolve(intentResults);
    });

  });
}
function buildCustomSlots(repositories) {
  return new Promise((resolve, reject) => {
    const results = [];

    console.log("Building Custom Slots");

    async.each(repositories, (repository, callback) => {
      console.log(`Building Custom Slots for ${repository.name}`);
      console.log(JSON.stringify(repository));

      if(repository.attributes && repository.attributes.properties) {
        const customSlotValues = [];

        _.each(repository.attributes.properties, (property) => {
          if(!_.find(results, { "name": property.custom_slot_type})) {
            results.push({
              name: property.custom_slot_type,
              values: []
            })
          }
          const customSlot = _.find(results, { "name": property.custom_slot_type});
          const synonyms = [];

          const customSlotValue = cleanse(property.name).substring(0, 140);

          const matchingSlotValue = _.includes(customSlotValues, customSlotValue.toLowerCase());

          if(!matchingSlotValue) {
            _.each(property.synonyms, (synonym) => {
              synonyms.push(cleanse(synonym).substring(0, 140));
            });
            customSlotValues.push(customSlotValue.toLowerCase());

            customSlot.values.push({
              "name": {
                "value": customSlotValue,
                "synonyms": synonyms
                }
            });
          } else {
            console.log(`Skipping ${customSlotValue}`);
          }
        });
      }

      const custom_slot_type = repository.repository_type.slot_type;

      if(custom_slot_type) {
        console.log(custom_slot_type);

        if(!_.find(results, { "name": custom_slot_type})) {
          results.push({
            name: custom_slot_type,
            values: []
          })
        }
        const customSlot = _.find(results, { "name": custom_slot_type});
        const customSlotValues = [];

        Entity.find({
          repository: repository
        })
        .exec()
        .then((entities) => {
          _.each(entities, (entity) => {
            const customSlotValue = cleanse(entity.name).substring(0, 50);

            const matchingSlotValue = _.includes(customSlotValues, customSlotValue.toLowerCase());

            if(!matchingSlotValue) {
              const synonyms = [];
              _.each(entity.synonyms, (synonym) => {
                synonyms.push(cleanse(synonym).substring(0, 50));
              });
              customSlotValues.push(customSlotValue.toLowerCase());
              customSlot.values.push({
                "name": {
                  "value": customSlotValue,
                  "synonyms": synonyms
                  }
              });
            } else {
              console.log(`Skipping ${customSlotValue}`);
            }
          });

          callback();
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        callback();
      }
    }, (err) => {
      if(err) { return reject(err); }

      resolve(results);
    });
  });
}
function buildDialogs(repositories) {
  return new Promise((resolve, reject) => {
    console.log("Building Dialogs");

    const result = {};

    const intentsArray = [];

    _.each(repositories, (repository) => {
      _.each(repository.repository_type.intents, (intent) => {
        console.log(intent.name);

        if(intent.hasRequiredSlots()) {
          const intentJson = {
            name: intent.name,
            confirmationRequired: false,
            prompts: {},
            slots: []
          }
          _.each(intent.slots, (slot) => {
            const slotJson = {
              "name": slot.name,
              "type": slot.custom_slot_type.name,
              "elicitationRequired": slot.required,
              "confirmationRequired": false,
              "prompts": {}
            }
            if(slot.required) {
              slotJson.prompts = {
                "elicitation": `Elicit.Intent-${intent.name}.IntentSlot-${slot.name}`
              }
            }
            intentJson.slots.push(slotJson);
          });

          intentsArray.push(intentJson);
        }
      });
    });

    result["intents"] = intentsArray;

    resolve(result);
  });
}
function buildPrompts(repositories) {
  return new Promise((resolve, reject) => {
    console.log("Building Prompts");

    const results = [];

    _.each(repositories, (repository) => {
      _.each(repository.repository_type.intents, (intent) => {
        _.each(intent.slots, (slot) => {
          if(slot.required) {
            const promptJson = {
              id: `Elicit.Intent-${intent.name}.IntentSlot-${slot.name}`,
              variations: []
            }
            _.each(slot.prompts, (prompt) => {
              promptJson.variations.push({
                type: "PlainText",
                value: prompt
              });
            });
            results.push(promptJson);
          }
        });
      });
    });

    resolve(results);
  });
}
function filterRepositories(repositories) {
  return new Promise((resolve, reject) => {
    const filteredRepositories = [];

    async.each(repositories, (repository, callback) => {
      Entity.find({
        repository: repository
      })
      .then((entities) => {
        if(entities.length > 0) {
          filteredRepositories.push(repository);
        }

        callback();
      })
      .catch((err) => {
        callback(err);
      });
    }, (err) => {
      if(err) { reject(err); }

      resolve(filteredRepositories);
    });
  });
}
const InteractionModelBuilder = {
  buildJSON: (application, repositories) => {
    return new Promise((resolve, reject) => {
      console.log("Building Interaction Model");

      const results = {};
      const interactionModel = {};
      const languageModel = {};

      languageModel["invocationName"] = application.invocation_name;

      console.log(`Filtering Repositories ${repositories.length}`);

      filterRepositories(repositories)
      .then((filteredRepositories) => {
        repositories = filteredRepositories;

        console.log(`Building Intents: ${repositories.length}`);

        return buildIntents(repositories)
      })
      .then((jsonArray) => {
        languageModel["intents"] = jsonArray;

        console.log("Building Custom Slots");

        return buildCustomSlots(repositories);
      })
      .then((jsonArray) => {
        languageModel["types"] = jsonArray
        interactionModel["languageModel"] = languageModel;

        console.log("Building Prompts");

        return buildPrompts(repositories);
      })
      .then((jsonArray) => {
        if(jsonArray.length > 0) {
          interactionModel["prompts"] = jsonArray;
        }

        console.log("Building Dialogs");

        return buildDialogs(repositories);
      })
      .then((json) => {
        if(json) {
          interactionModel["dialog"] = json;
        }
        results["interactionModel"] = interactionModel;

        console.log("Setting Interaction Model");

        resolve(results);
      })
      .catch((err) =>{
        console.log(err);
        console.log(err.stack);

        reject(err);
      });
    });
  }
}

module.exports = InteractionModelBuilder;
