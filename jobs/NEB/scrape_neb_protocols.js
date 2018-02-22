import Nightmare from 'nightmare';

import Entity from '../../app/models/entity';
import Company from '../../app/models/company';
import Entity from '../../app/models/entity';

import mongoose from 'mongoose';
import jackrabbit from 'jackrabbit';
import _ from 'lodash';
import forOwn from 'lodash.forown';
import async from 'async';

import connections from '../../src/connection.js';
import config from '../../src/config';

const NEB_DIGEST_URL = "http://nebcloner.neb.com/#!/redigest";
const NEB_COMPANY_NAME = "New England BioLabs";

const protocolsToParse = [{
  "enzyme1": "AatII"
},{
  "enzyme1": "AgeI"
}, {
  "enzyme1": "BaeI"
}, {
  "enzyme1": "BamHI-HF"
}, {
  "enzyme1": "BbsI"
}, {
  "enzyme1": "BglII"
},{
  "enzyme1": "BsaI-HF"
}, {
  "enzyme1": "BstBI"
}, {
  "enzyme1": "DpnI"
}, {
  "enzyme1": "DpnII"
}, {
  "enzyme1": "EcoP15I"
}, {
  "enzyme1": "HindIII"
}, {
  "enzyme1": "KpnI"
}, {
  "enzyme1": "MslI"
}, {
  "enzyme1": "NotI"
}, {
  "enzyme1": "Nt.BstNBI"
}, {
  "enzyme1": "SmlI"
}, {
  "enzyme1": "SspI"
}, {
  "enzyme1": "XbaI"
}, {
  "enzyme1": "XhoI"
}, {
  "enzyme1": "DpnII",
  "enzyme2": "EcoP15I"
}, {
  "enzyme1": "DpnII",
  "enzyme2": "BglII"
}, {
  "enzyme1": "KpnI",
  "enzyme2": "EcoP15I"
}, {
  "enzyme1": "KpnI",
  "enzyme2": "BglII"
}, {
  "enzyme1": "SmlI",
  "enzyme2": "BglII"
}, {
  "enzyme1": "SmlI",
  "enzyme2": "BaeI"
}, {
  "enzyme1": "XhoI",
  "enzyme2": "BaeI"
}, {
  "enzyme1": "XhoI",
  "enzyme2": "KpnI"
}, {
  "enzyme1": "AatII",
  "enzyme2": "AgeI"
}, {
  "enzyme1": "BsaI-HF",
  "enzyme2": "HindIII"
}, {
  "enzyme1": "XbaI",
  "enzyme2": "SmlI"
}, {
  "enzyme1": "XbaI",
  "enzyme2": "NotI"
}, {
  "enzyme1": "XbaI",
  "enzyme2": "XhoI"
}, {
  "enzyme1": "BstBI",
  "enzyme2": "BglII"
}, {
  "enzyme1": "BstBI",
  "enzyme2": "NotI"
}, {
  "enzyme1": "AatII",
  "enzyme2": "HindIII"
}, {
  "enzyme1": "AatII",
  "enzyme2": "MslI"
}, {
  "enzyme1": "BamHI-HF",
  "enzyme2": "KpnI"
}, {
  "enzyme1": "Nt.BstNBI",
  "enzyme2": "XbaI"
}]

const enzymes = [
  "AatII",
  "AgeI",
  "BaeI",
  "BamHI-HF",
  "BbsI",
  "BglII",
  "BsaI-HF",
  "BstBI",
  "DpnI",
  "DpnII",
  "EcoP15I",
  "HindIII",
  "KpnI",
  "MslI",
  "NotI",
  "Nt.BstNBI",
  "SmlI",
  "SspI",
  "XbaI",
  "XhoI",
]
/**
 * Function passes enzyme name to uppercase,
 * removes '-' and '.'
 * and changes 'i's at the end to number
 * @param {string} enzyme
 */
function refactorEnzymeName(enzyme) {
    if(_.isEmpty(enzyme)) { return ""; }

    enzyme = enzyme.trim().replace('-',' ').replace('.','').replace(/([0-9]+)/g, "$1 ");
    const myRegexp = /I+(\s|$)/g;
    let match = myRegexp.exec(enzyme);
    let newEnzyme = enzyme;

    while (match != null) {
      const matchVal = match[0].trim();
      const number = matchVal.length;

      if(number > 0) {
          newEnzyme = newEnzyme.replace(matchVal, number);
      }

      match = myRegexp.exec(enzyme);
    }

    return newEnzyme.toUpperCase();
}
function scrapeProtocol(enzyme1, enzyme2) {
    return new Promise((resolve, reject) => {
      const nightmare = Nightmare({
        show: false
      });
      const protocol = Protocol();
      protocol.steps = [];

      nightmare
      .viewport(1000, 1000)
      .goto(NEB_DIGEST_URL)
      .wait("#formula-dsdnaamt-modal")
      .select("#re1", enzyme1)
      .select("#re2", enzyme2)
      .click('.btn')
      .wait(1000)
      .wait("#printableprotocol")
      .evaluate(function() {
        const steps = [];
        const elements = document.querySelectorAll('ol li');

        _.forEach(elements, (element, index) => {
          if(index == 0) {
            let step = 'Setup a ';

            const headers = element.querySelectorAll('th');
            const rows = element.querySelectorAll('tr');
            let reactionSize;
            const recipeSteps = {};
            let recipeStepsLength = 0;

            rows.forEach(function(row, i) {
              if(row.style.display != "none") {
                const isHeader = row.querySelectorAll('th');

                if(!_.isEmpty(isHeader)) {
                  reactionSize = row.querySelector("th:nth-child(2)").innerText.toLowerCase();
                } else {
                  const entity = row.querySelector("td:nth-child(1)").innerText;
                  const value = row.querySelector("td:nth-child(2)").innerText;

                  recipeSteps[entity] = value;
                  recipeStepsLength += 1;
                }
              }
            })

            step += `${reactionSize} using `;

            let index = 1;
            for(var entity in recipeSteps) {
              if(index < recipeStepsLength) {
                step += `${recipeSteps[entity]} of ${entity}, `;
              } else {
                step += `and `;
                step += `${recipeSteps[entity].replace('to ','')} of ${entity}.`;
              }
              index+=1;
            }

            steps.push(step);
          } else {
            if(element.style.display != "none") {
              steps.push(element.innerText);
            }
          }
        });

        return steps
      })
      .end()
      .then(function(steps) {
        _.forEach(steps, (step, index) => {
          let sayAs = step.replace(new RegExp(`${enzyme1}`, 'g'), `<entity>${enzyme1}</entity>`);
          sayAs = sayAs.replace(new RegExp(`${enzyme2}`, 'g'), `<entity>${enzyme2}</entity>`);

          if(index == 0) {
            protocol.steps.push({
              order: index,
              step_type: "Recipe",
              name: step,
              say_as: sayAs
            })
          } else {
            protocol.steps.push({
              order: index,
              step_type: "Action",
              name: step,
              say_as: sayAs
            })
          }
        });

        resolve(protocol);
      })
      .catch((err)=> {
        reject(err);
      });
  });
}
function parseProtocol(enzyme1, enzyme2, protocol_name, company) {
  return new Promise((resolve, reject) => {
    scrapeProtocol(enzyme1, enzyme2)
    .then((protocol) => {
      protocol.protocol_name = protocol_name
      protocol.owner = company;

      return protocol.save();
    })
    .then((doc) => {
      resolve(doc);
    })
    .catch((err) => {
      reject(err);
    })
  });
}
function updateProtocol(protocol, company) {
  return new Promise((resolve, reject) => {
    protocol.owner = company;

    _.forEach(protocol.steps, (step) => {
      step.say_as = step.name;
    });

    protocol.save()
    .then((doc) => {
      resolve(doc)
    })
    .catch((err) => {
      reject(err);
    });;
  });
}
function getCompany() {
   return new Promise((resolve, reject) => {
     Company.findOne({ name: NEB_COMPANY_NAME })
     .then((company) => {
       if(!company) {
         const newCompany = new Company();

         newCompany.name = NEB_COMPANY_NAME;
         newCompany.save()
         .then((doc) => {
           resolve(newCompany);
         })
         .catch((err) => {
           reject(err);
         });
       } else {
         resolve(company);
       }
     })
     .catch((err)=> {
       reject(err);
     });
   });
 }
/**
 * Functions calls to check if NEB company exists,
 * then scrapes NEB website to get double digest protocols
 * for pairs of enzymes in csv file.
 */
let ProtocolScraper = {
  scrapeNEBProtocols: function(queue) {
    let company;
    let enzyme1;
    let enzyme2;
    let protocol_name;

    getCompany()
    .then((company) => {
      const results = [];

      console.log(`Scraping ${company.name} protocols`);

      async.eachSeries(protocolsToParse, (protocolToParse, callback) => {
        if(protocolToParse.enzyme2) {
          protocol_name = `Restriction Enzyme Digest with ${protocolToParse.enzyme1} and ${protocolToParse.enzyme2}`;
        } else {
          protocol_name = `Restriction Enzyme Digest with ${protocolToParse.enzyme1}`;
        }
        Protocol.getProtocol(protocol_name)
        .then((protocol) => {
          if(!protocol) {
            parseProtocol(protocolToParse.enzyme1, protocolToParse.enzyme2, protocol_name, company)
            .then((document) => {
              results.push(document);

              console.log(`Protocol ${protocol_name} saved.`);

              callback();
            })
            .catch((err) => {
              callback(err);
            })
          } else {
            updateProtocol(protocol, company)
            .then((document) => {
              results.push(document);

              console.log(`Protocol ${protocol_name} updated.`);

              callback();
            })
            .catch((err) => {
              callback(err);
            })
          }
        })
        .catch((err) => {
          callback(err);
        })
      }, (err) => {
        if(err) {
          console.log(`Error scraping protocol ${err}: ${err.stack}`);
        }

        console.log(`${results.length} saved.`);

      });
    })
    .catch((err) => {
      console.log(`Error parsing protocol ${err}: ${err.stack}`);

      return;
    });
  }
}

const connectionObj = connections.createConnection(config.mongo_url, config.rabbit_url);
ProtocolScraper.scrapeNEBProtocols(connectionObj.queue)
