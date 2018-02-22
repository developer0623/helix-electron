import Nightmare from 'nightmare';
import _ from 'lodash';
import async from 'async';

import config from '../src/config';
import connections from '../src/connection';

import entities from './entities';

const url = "https://pubchem.ncbi.nlm.nih.gov";

function scrap(entityName) {
  return new Promise((resolve, reject) => {
    var nightmare = Nightmare({ show: false,
      waitTimeout: 5000 // in ms
    });
    nightmare
      .goto(url)
      .type('#term', entityName)
      .click('#go')
      .wait('.rprt')
      .click('.rprt a')
      .wait('#MeSH-Entry-Terms')
      .evaluate(function () {

        let name = '';
        document.querySelectorAll('.summary-title span').forEach(function(element) {
          if(name.length > 0) {
            name += ' ';
          }
          name += element.innerText;
        });

        let synonyms = [];
        document.querySelectorAll('#MeSH-Entry-Terms ol li').forEach(function(listItem) {
          synonyms.push(listItem.innerText);
        });

        return {
          name,
          synonyms
        };
      })
      .end()
      .then(function (result) {
        resolve(result);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

connections.createConnection(config.mongo_url, config.rabbit_url);

const errors = []
async.eachSeries(entities, (entity, callback) => {
  console.log("Start Scraping for " + entity);

  scrap(entity)
  .then((result) => {
    CustomSlot.addCustomSlot(null, entity, "ENTITY", result.synonyms)
    .then(() => {
      console.log("Saved Entity Slot " + entity);

      callback()
    })
    .catch((err) => {
      console.log("Failed to Save Entity Slot " + err);

      errors.push("Error saving " + entity + ": " + err);

      callback();
    });
  })
  .catch((err) => {
    console.log("Error scraping " + entity + ": " + err);

    errors.push("Error scraping " + entity + ": " + err);

    CustomSlot.addCustomSlot(null, entity, "ENTITY", [])
    .then(() => {
      console.log("Saved Entity Slot " + entity);

      callback()
    })
    .catch((err) => {
      console.log("Failed to Save Entity Slot " + err);

      errors.push("Error saving " + entity + ": " + err);

      callback();
    });
  });
}, (err) => {
  console.log("Errors: " + JSON.stringify(errors));
});
