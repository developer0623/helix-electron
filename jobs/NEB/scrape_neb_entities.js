import mongoose from 'mongoose';
import connections from '../../src/connection.js';
import config from '../../src/config';
import Nightmare from 'nightmare';
import cheerio from 'cheerio';
import csv from "fast-csv";
import _ from 'lodash';
import async from 'async';

import Company from '../../app/models/company';
import Entity from '../../app/models/entity';

const NEB_DIGEST_URL = "http://nebcloner.neb.com/#!/redigest";
const NEB_COMPANY_NAME = "New England BioLabs";

import * as propertyTypes from '../../app/models/types/propertyTypes';

const enzymes = [
  "AatII",
  "AgeI",
  "BaeI",
  "BamHI",
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

function getEnzymes() {
 return new Promise((resolve, reject) => {
   resolve(enzymes);
 });
}
function cleanseEnzymeName(enzyme) {
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
function getCompany() {
  return new Promise((resolve, reject) => {
    Company.findOne({ name: NEB_COMPANY_NAME })
    .then((company) => {
      if(!company) {
        const newCompany = new Company();

        newCompany.name = NEB_COMPANY_NAME;
        newCompany.save()
        .then((doc) => {
          console.log("NEB company saved: " + newCompany.id);

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
      console.log("Error searching company: "+ err);

      reject(err);
    });
  });
}
/**
 * Function finds the url for a given enzyme pair,
 * then scrapes the page for the corresponding
 * Restriction Enzyme Digest for given enzymes.
 */
function scrapeEnzymeData(enzyme1) {
    return new Promise((resolve, reject) => {
        const nightmare = Nightmare();
        //Initialize array of steps in Protocol
        const kb = Entity();
        kb.attributures = [];

        nightmare
        .viewport(1000, 1000)
        .goto(NEB_DIGEST_URL)
        .wait("#formula-dsdnaamt-modal")
        .select("#re1", enzyme1)
        .wait(2000)
        .evaluate(function() {
          const dataTable = document.getElementById("one-true").innerHTML;

          return dataTable;
        })
        .end()
        .then((result) => {
          const $ = cheerio.load(result);

          let table1;
          let table2;

          $("table").each(function(i, elem) {
            if(i == 0) {
              table1 = $(this).children().first().children().first().next().next()
            } else if(i == 1) {
              table2 = $(this).children().first().children().first().next().children().first();
            }
          });
          //Capturing data from first table
          const enzymeName = table1.children().first().text();
          table1 = table1.children().next();

          const catalogNumber = table1.first().text();
          table1 = table1.next();

          let temperature = table1.first().text();
          if(parseInt(temperature)) {
            temperature += '°C';
          }
          table1 = table1.next();

          const nebuffer = table1.first().text();
          table1 = table1.next();

          const sam = table1.first().text();
          table1 = table1.next();

          const act11 = `${table1.first().text()}%`;
          table1 = table1.next();

          const act21 = `${table1.first().text()}%`;
          table1 = table1.next();

          const act31 = `${table1.first().text()}%`;

          table1 = table1.next();
          const cutsmart = `${table1.first().text()}%`;

          table2 = table2.next();
          const timeSaver = table2.text();

          table2 = table2.next();
          let heatInactivation = table2.first().text();
          if(_.parseInt(heatInactivation)) {
            heatInactivation += '°C';
          }
          table2 = table2.next();
          const methylationSensitivity = table2.first().text();

          kb.item_name = enzymeName;
          kb.say_as = `<say-as interpret-as="characters">${cleanseEnzymeName(enzymeName)}</say-as>`;
          kb.synonyms.push(cleanseEnzymeName(enzymeName));

          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.CATALOG_NUMBER,
              "value": catalogNumber
          });
          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.INCUBATION_TEMPERATURE,
              "value": temperature
          });
          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.SUPPLIED_NEBUFFER,
              "value": nebuffer
          });
          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.REQUIRES_SAM,
              "value": sam
          });
          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.PERCENT_ACTIVITY_IN_NEBUFFER_1_1,
              "value": act11
          });
          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.PERCENT_ACTIVITY_IN_NEBUFFER_2_1,
              "value": act21
          });
          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.PERCENT_ACTIVITY_IN_NEBUFFER_3_1,
              "value": act31
          });
          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.PERCENT_ACTIVITY_IN_NEBUFFER_CUTSMART,
              "value": cutsmart
          });
          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.TIME_SAVER_QUALIFIED,
              "value": timeSaver
          });
          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.HEAT_INACTIVATION_TEMPERATURE,
              "value": heatInactivation
          });
          kb.properties.push({
              "type": "PlainText",
              "key": propertyTypes.METHYLATION_SENSITIVITY,
              "value": methylationSensitivity
          });

          resolve(kb);
        })
        .catch((err)=> {
          console.log("error" + JSON.stringify(err) + ": " + err.stack);

          return;
        });
    });
}

/**
 * Functions calls to check if NEB company exists,
 * then scrapes NEB website to get double digest protocols
 * for pairs of enzymes in csv file.
 */
const EnzymeScraper = {
  scrapeEnzymeData: () => {
    let enzymes;

    getEnzymes()
    .then((results) => {
      enzymes = results;

      return getCompany();
    })
    .then((company) => {
      async.eachSeries(enzymes, (enzyme, callback) => {
        if(!_.isEmpty(enzyme)) {
          KnowledgeBase.findOne({
            item_name: enzyme
          })
          .then((knowledgeItem) => {
            if(!knowledgeItem) {
              console.log("Scraping data for enzyme: " + enzyme);

              scrapeEnzymeData(enzyme)
              .then((kbItem) => {
                kbItem.owner = company;

                kbItem.save()
              })
              .then(() => {
                console.log(`Saved ${enzyme}`);

                callback();
              })
              .catch((err) => {
                callback(err);
              });
            } else {
              console.log(`Knowledge Base Item ${enzyme} already exists`);

              callback();
            }
          })
          .catch((err) => {
            callback(err);
          });
        }
      }, (err) => {
        if(err) {
          console.log(`Error scraping enzyme ${err}`);
        }

        return;
      });
    })
    .catch((err) => {
      console.log(`Error reading enzymes from csv file. ${err}`);

      return;
    });
  }
}

const connectionObj = connections.createConnection(config.mongo_url, config.rabbit_url);
EnzymeScraper.scrapeEnzymeData()
