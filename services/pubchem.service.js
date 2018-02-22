import superagent from 'superagent';
import _ from 'lodash';
import async from 'async';
import tree from './pubchem.parsetree';
import Entity from '../app/models/entity';
import striptags from 'striptags';

import * as entityTypes from '../app/models/types/entityTypes';

//https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/methanol/property/MolecularWeight/json
//https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/methanol/property/description/json
//https://pubchem.ncbi.nlm.nih.gov/rest/pug/substance/name/methanol/cids/json
//https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/887/JSON

// 2D Structure
// 3D Conformer
// LCSS
// Names and Identifiers
// Chemical and Physical Properties
// Related Records
// Chemical Vendors
// Drug and Medication Information
// Food Additives and Ingredients
// Agrochemical Information
// Pharmacology and Biochemistry
// Use and Manufacturing
// Identification
// Safety and Hazards
// Toxicity
// Literature
// Patents
// Biomolecular Interactions and Pathways
// Biological Test Results
// Classification

function saveToKnowledgeBase(key, properties, repository) {
  return new Promise((resolve, reject) => {
    Entity.findOne({
      name_lower: key.toLowerCase()
    })
    .then((entity) => {
      if(_.isEmpty(entity)) {
        entity = new Entity();
      }
      entity.name = key;
      entity.type = entityTypes.KNOWLEDGEBASE;
      entity.attributes = properties;
      entity.owner = repository.owner;
      entity.repository = repository;

      entity.markModified('attributes');
      entity.save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    })
    .catch((err) => {
      reject(err);
    });
  });
}
function parseInformation(step, section) {
  return new Promise((resolve, reject) => {
    if(section.Information  && section.Information.length >= step.index) {
      resolve(section.Information[step.index]);
    } else{
      reject(new Error("Unable to find Section " + step.index));
    }
  });
}
function parseSteps(steps, json) {
  return new Promise((resolve, reject) => {
    async.eachSeries(steps, (step, callback) => {
      parseStep(step, json)
      .then((section) => {
        json = section;

        callback();
      })
      .catch((err) => {
        callback(err);
      });
    }, (err) => {
      if(err) { reject(err); }

      resolve(json);
    });
  });
}
function parseStep(step, section) {
  return new Promise((resolve, reject) => {
    if(step.type == "Section") {
      parseSection(step.key, section.Section)
      .then((section) => {

        resolve(section);
      })
      .catch((err) => {
        reject(err);
      })
    }
    if(step.type == "Information") {
      parseInformation(step, section)
      .then((information) => {
        resolve(information)
      })
      .catch((err) => {
        reject(err);
      })
    }
    if(step.type == "Table") {
      parseTable(step, section.Table)
      .then((information) => {
        resolve(information)
      })
      .catch((err) => {
        reject(err);
      });
    }
    if(step.type == "ParseStringValue") {
      parseStringValue(step, section)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err);
      })
    }
    if(step.type == "ParseNumValue") {
      parseNumValue(step, section)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err);
      })
    }
    if(step.type == "ParseNumAndUnitValue") {
      parseNumAndUnitValue(step, section)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err);
      })
    }
  });
}
function parseTable(step, table) {
  return new Promise((resolve, reject) => {
    _.each(table.Row, (row) => {

      if(row.Cell[0].StringValue == step.key) {
        resolve(row.Cell[1])
      }
    });

    reject(new Error("Unable to find cell " + step.key))
  })
}
function parseSection(heading, sections) {
  return new Promise((resolve, reject) => {
    _.each(sections, (section) => {
      if(section.TOCHeading == heading) {
        resolve(section);
      }
    });

    reject(new Error("Unable to find section " + heading));
  });
}
function getPubChemCID(entityName) {
  return new Promise((resolve, reject) => {
    //const url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/substance/name/" + entityName + "/cids/json"
    const url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + entityName + "/cids/json"

    superagent('GET', url)
    .end((err, res) => {
      if(err) { reject(err); }

      resolve(res.body);
    });
  });
}
function getPubChemDocument(cid) {
  return new Promise((resolve, reject) => {
    const url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/" + cid + "/JSON";

    superagent('GET', url)
    .end((err, res) => {
      if(err) { reject(err); }
      if(!res) { reject(err); }

      resolve(res.body);
    });
  });
}
function getImageUrl(cid){
  return `https://pubchem.ncbi.nlm.nih.gov/image/imagefly.cgi?cid=${cid}&width=500&height=500`;
}
function parseName(json) {
  return new Promise((resolve, reject) => {
    const propertyTree = tree["name"];
    let result = json;

    if(propertyTree) {
      async.eachSeries(propertyTree, (step, callback) => {
        parseStep(step, result)
        .then((section) => {
          result = section;

          callback();
        })
        .catch((err) => {
          callback(err);
        });
      }, (err) => {
        if(err) { reject(err); }

        resolve(result);
      });
    } else {
      reject(new Error("Unknown Name Property"));
    }
  });
}
function parseStringValue(step, json) {
  return new Promise((resolve, reject) => {
    resolve(json.StringValue);
  });
}
function parseNumValue(step, json) {
  return new Promise((resolve, reject) => {
    resolve(json.NumValue);
  });
}
function parseNumAndUnitValue(step, json) {
  return new Promise((resolve, reject) => {
    resolve(json.NumValue + " " + json.ValueUnit);
  });
}
function clense(text) {
  return striptags(text);
}
const PubChemService = {
  ParseSDSDocument: function(entityName) {
    return new Promise((resolve, reject) => {
      getPubChemCID(entityName)
      .then((results) => {
        const entries = results["IdentifierList"]["CID"];
        if(_.isEmpty(entries)) { reject(new Error("Unable to Find CID")); }

        const keys = [];
        _.forOwn(tree, (value, key) => {
          keys.push(key);
        });
        const cids = [];
        const resultsJson = [];

        _.each(entries, (entry, callback) => {
          if(!_.includes(cids, entry)) {
            cids.push(entry);
          }
        })
        console.log(`Parsing CIDs ${cids}`);
        const addedKeys = [];
        async.each(cids, (cid, callback) => {
          console.log(`Parsing CID ${cid}`);

          getPubChemDocument(cid)
          .then((json) => {
            if(_.isEmpty(json)) { reject( new Error("Unable to find Document")); }

            const record = json["Record"];

            let result = record;

            async.eachSeries(keys, (key, callback) => {
              const steps = tree[key];

              parseSteps(steps, result)
              .then((stepResult) =>{
                if(!_.includes(addedKeys, key)) {
                  resultsJson.push({
                    key: key,
                    value: clense(stepResult),
                    type: "PlainText"
                  });
                  addedKeys.push(key);
                }

                callback();
              })
              .catch((err) => {
                console.log(err);

                callback();
              })
            }, (err) => {
              if(err) { reject(err); }

              // resultsJson.push({
              //   key: "ImageUrl",
              //   value: getImageUrl(cid),
              //   type: "Image"
              // });
              callback();

            });
          })
          .catch((err) => {
            console.log(`Error getting CID ${cid} : ${err}`);

            callback();
          });
        }, (err) => {
          if(err) { reject(err); }

          saveToKnowledgeBase(entityName, resultsJson, repository)
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          })
        });
      })
      .catch((err) => {
        reject(err);
      })
    });
  },
  ValidateEntity: function(entityName) {
    return new Promise((resolve, reject) => {
      console.log("Getting PubChem");

      getPubChemCID(entityName)
      .then((results) => {
        console.log("Pub Chem " + results);
        resolve(!_.isEmpty(results));
      })
      .catch((err) => {
        console.log("It's false");

        resolve(false);
      })
    });
  },
  LookupProperty: function(entityName, propertyName) {
    return new Promise((resolve, reject) => {

      getPubChemCID(entityName)
      .then((results) => {
        const entries = results["IdentifierList"]["CID"];
        if(_.isEmpty(entries)) {
          resolve(null);
        }

        const cid = entries[0];

        getPubChemDocument(cid)
        .then((json) => {
          const record = json["Record"];

          let result = record;

          parseName(record)
          .then((name)=> {
            const propertyTree = tree[propertyName.toLowerCase()];

            if(propertyTree) {
              async.eachSeries(propertyTree, (step, callback) => {
                parseStep(step, result)
                .then((section) => {
                  result = section;

                  callback();
                })
                .catch((err) => {
                  callback(err);
                });
              }, (err) => {
                if(err) { reject(err); }

                resolve([name, clense(result), "PlainText"]);
              });
            } else{
              reject(new Error("Invalid property: " + propertyName));
            }
          })
          .catch((err) => {
            reject(err);
          });
        })
        .catch((err) => {
          reject(err);
        })
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = PubChemService;
