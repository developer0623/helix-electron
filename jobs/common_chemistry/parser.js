import Nightmare from 'nightmare';
import _ from 'lodash';
import async from 'async';

import config from '../../src/config';
import connections from '../../src/connection';

import cids from './cids';

const url = "https://pubchem.ncbi.nlm.nih.gov";

function scrape(nightmare, cid) {
  return new Promise((resolve, reject) => {
    let isSummary = false;

    nightmare
      .goto(url)
      .type('#term', cid)
      .click('#go')
      .wait(4000)
      .evaluate(() => {
        return document.querySelector('.summary-title span');
      })
      .then((element) => {
        if(!element) {
          return nightmare.click('.rprt a')
          .wait('#MeSH-Entry-Terms');
        } else {
          return nightmare;
        }
      })
      .then(() => {
        return nightmare.evaluate(() => {
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
        });
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

connections.createConnection(config.mongo_url, config.rabbit_url);

const errors = []
var nightmare = Nightmare({
  show: true,
  waitTimeout: 5000 // in ms
});
async.eachSeries(cids, (cid, callback) => {
  console.log("Start Scraping for " + cid);

  scrape(nightmare, cid)
  .then((result) => {
    console.log("RESULT: " + JSON.stringify(result));

    CustomSlot.addCustomSlot(null, result.name, "ENTITY", result.synonyms)
    .then(() => {
      console.log("Saved Entity Slot " + result.name);

      callback()
    })
    .catch((err) => {
      console.log("Failed to Save Entity Slot " + err);

      errors.push("Error saving " + result.name + ": " + err);

      callback();
    });
  })
  .catch((err) => {
    console.log("Error scraping " + cid + ": " + err);

    errors.push("Error scraping " + cid + ": " + err);

    callback();
  });
}, (err) => {
  console.log("Errors: " + JSON.stringify(errors));
});
