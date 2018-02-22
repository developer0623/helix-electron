import _ from 'lodash';
import async from 'async';
import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import alexaApp from '../../../lib/alexa';
import { Entity,
  IntentLog } from '../../models';
import {
  ApplicationFactory,
  CompanyFactory,
  RepositoryFactory,
  InventoryItemFactory,
  UserFactory } from '../../../factories';
import {
  createDB,
  destroyDB,
  formatPayload } from '../../../test/test-helper';
import { expect } from 'chai';

const APPLICATION_ID = "amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe";

let app = express();
alexaApp.express({
  expressApp: app,
  checkCert: false,
  debug: true
});

let user;
let accessToken;
let application;
let company;
let repository;

describe('Alexa Inventory Controller', () => {
  beforeEach((done) => {
    createDB(() => {
      UserFactory.createUserWithAccessToken()
      .then((createdUser, createdAccessToken) => {
        user = createdUser;
        accessToken = createdAccessToken;

        return CompanyFactory.createCompany();
      })
      .then((createdCompany) => {
        company = createdCompany;

        return ApplicationFactory.createApplication(APPLICATION_ID, company);
      })
      .then((createdApplication) => {
        application = createdApplication;

        const attributes = {}
        return RepositoryFactory.createRepository(company, "INVENTORYITEM", attributes);
      })
      .then((createdRepository) => {
        repository = createdRepository;

        const items = [{
          name: "Acetic Anhydride",
          location: "room 323",
          sub_location: "top shelf",
          location_detail: "far right",
          quantity: "12",
          units: "ml"
        }, {
          name: "Gloves",
          location: "store room",
          sub_location: "first floor",
          quantity: "1500",
          units: "units"
        }, {
          name: "Distilled Water",
          location: "room 110",
          quantity: "150",
          units: "gal"
        }, ];

        async.each(items, (item, callback) => {
          const entity = {
            name: item.name
          };
          const attributes = {
            location: item.location,
            sub_location: item.sub_location,
            location_detail: item.location_detail,
            quantity: item.quantity,
            units: item.units
          };

          InventoryItemFactory.createEntity(entity.name, attributes, company, repository)
          .then((savedEntity) => {
            callback();
          })
          .catch((err) => {
            callback(err);
          });
        }, (err) => {
          if(err) { throw err; }

          done();
        });
      })
      .catch((err) => {
        done(err);
      });
    });
  });
  afterEach((done) => {
    destroyDB(() => {
      done();
    });
  });
  describe('Manage Inventory', () => {
    const intent = "InventoryItemLocationIntent";

    it('should return the location of an inventory item with location, sub_location and location detail', (done) => {
      const itemName = "Acetic Anhydride";
      const location = "room 323";
      const sub_location = "top shelf";
      const location_detail = "far right";

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>Your ${itemName} is located in ${location}, ${sub_location}, ${location_detail}.</speak>`
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
          "slots": {
            "ProductName": {
              "name": "ProductName",
              "value": itemName
            }
          }
        }
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;
        //const repromptSpeech = response.reprompt.outputSpeech;

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);
          //expect(repromptSpeech.type).to.equal(expectedReprompt.type);
          //expect(repromptSpeech.ssml).to.equal(expectedReprompt.ssml);
          done();
        })
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should locate inventory item', (done) => {
      const itemName = "Acetic Anhydride";
      const location = "room 323";
      const sub_location = "top shelf";
      const location_detail = "far right";

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>Your ${itemName} is located in ${location}, ${sub_location}, ${location_detail}.</speak>`
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
          "slots": {
            "ProductName": {
              "name": "ProductName",
              "value": itemName
            }
          }
        }
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;
        //const repromptSpeech = response.reprompt.outputSpeech;

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);
          //expect(repromptSpeech.type).to.equal(expectedReprompt.type);
          //expect(repromptSpeech.ssml).to.equal(expectedReprompt.ssml);

          done();
        })
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should subtract amount from inventory item', (done) => {
      const intent = "SubtractInventoryItemAmount";
      const itemName = "Acetic Anhydride";
      const amount = "3";
      const units = "ml";
      const originalAmount = 12;

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>Ok. <break time="0.3s" />I updated the inventory for ${itemName}. We have about ${parseInt(originalAmount) - parseInt(amount)}${units} remaining.</speak>`
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
          "slots": {
            "Entity": {
              "name": "Entity",
              "value": itemName
            },
            "Amount": {
              "name": "Amount",
              "value": amount
            },
            "Units": {
              "name": "Units",
              "value": units
            }
          }
        }
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;
        //const repromptSpeech = response.reprompt.outputSpeech;

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);
          //expect(repromptSpeech.type).to.equal(expectedReprompt.type);
          //expect(repromptSpeech.ssml).to.equal(expectedReprompt.ssml);
          done();
        })
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should add amount to inventory item', (done) => {
      const intent = "AddInventoryItemAmount";
      const itemName = "Acetic Anhydride";
      const amount = "24";
      const units = "ml";
      const originalAmount = 12;

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>Ok. <break time="0.3s" />I updated the inventory for ${itemName}. We have about ${parseInt(originalAmount) + parseInt(amount)}${units} remaining.</speak>`
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
          "slots": {
            "Entity": {
              "name": "Entity",
              "value": itemName
            },
            "Amount": {
              "name": "Amount",
              "value": amount
            },
            "Units": {
              "name": "Units",
              "value": units
            }
          }
        }
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;
        //const repromptSpeech = response.reprompt.outputSpeech;

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);
          //expect(repromptSpeech.type).to.equal(expectedReprompt.type);
          //expect(repromptSpeech.ssml).to.equal(expectedReprompt.ssml);
          done();
        })
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should set amount status of inventory item', (done) => {
      const intent = "InventoryAmountIntent";
      const entity = "Acetic Anhydride";
      const inventoryAmount = "low";

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>Ok, I made a note.</speak>`
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
          "slots": {
            "Entity": {
              "name": "Entity",
              "value": entity
            },
            "InventoryAmount": {
              "name": "InventoryAmount",
              "value": inventoryAmount
            }
          }
        }
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;
        //const repromptSpeech = response.reprompt.outputSpeech;

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);
          //expect(repromptSpeech.type).to.equal(expectedReprompt.type);
          //expect(repromptSpeech.ssml).to.equal(expectedReprompt.ssml);
          // Entity.findOne({
          //   name_lower: entity.toLowerCase()
          // })
          // .then((entity) => {
          //   if(!entity) { done("Unable to find checkout inventory item!"); }
          //
          //   expect(lastCheckoutBy).to.equal(name, `Expected last_checked_out_by to be ${name}`);
          //   expect(status).to.equal(checkout_status, `Expected checkout_status to be ${checkout_status}`);
          //
          //   done();
          // })
          // .catch((err) => {
          //   done(err);
          // });
          done();
        })
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should checkout inventory item', (done) => {
      const intent = "InventoryCheckoutIntent";
      const entity = "Acetic Anhydride";
      const name = "James";
      const checkout_status = "CHECKOUT_OUT";

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>Ok, I checked out ${entity}.</speak>`
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
          "slots": {
            "Entity": {
              "name": "Entity",
              "value": entity
            },
            "Name": {
              "name": "Name",
              "value": name
            }
          }
        }
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;
        //const repromptSpeech = response.reprompt.outputSpeech;

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);
          //expect(repromptSpeech.type).to.equal(expectedReprompt.type);
          //expect(repromptSpeech.ssml).to.equal(expectedReprompt.ssml);
          Entity.findOne({
            name_lower: entity.toLowerCase()
          })
          .then((entity) => {
            if(!entity) { done("Unable to find checkout inventory item!"); }

            const lastCheckoutBy = entity.attributes.last_checked_out_by;
            const status = entity.attributes.checkout_status;

            expect(lastCheckoutBy).to.equal(name, `Expected last_checked_out_by to be ${name}`);
            expect(status).to.equal(checkout_status, `Expected checkout_status to be ${checkout_status}`);

            done();
          })
          .catch((err) => {
            done(err);
          });
        })
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should check-in inventory item', (done) => {
      const intent = "InventoryCheckinIntent";
      const entity = "Acetic Anhydride";
      const name = "James";
      const checkout_status = "CHECK_IN";

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>Ok, I checked in ${entity}.</speak>`
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
          "slots": {
            "Entity": {
              "name": "Entity",
              "value": entity
            },
            "Name": {
              "name": "Name",
              "value": name
            }
          }
        }
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;
        //const repromptSpeech = response.reprompt.outputSpeech;

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);
          //expect(repromptSpeech.type).to.equal(expectedReprompt.type);
          //expect(repromptSpeech.ssml).to.equal(expectedReprompt.ssml);
          Entity.findOne({
            name_lower: entity.toLowerCase()
          })
          .then((entity) => {
            if(!entity) { done("Unable to find checkout inventory item!"); }

            const lastCheckoutBy = entity.attributes.last_checked_out_by;
            const status = entity.attributes.checkout_status;

            expect(lastCheckoutBy).to.equal(name, `Expected last_checked_out_by to be ${name}`);
            expect(status).to.equal(checkout_status, `Expected checkout_status to be ${checkout_status}`);

            done();
          })
          .catch((err) => {
            done(err);
          });
        })
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should get inventory checkout status', (done) => {
      const intent = "InventoryItemCheckoutStatusIntent";
      const entity = "Acetic Anhydride";

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>It doesn't look like ${entity} is currently checked out of inventory.</speak>`
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
          "slots": {
            "ProductName": {
              "name": "ProductName",
              "value": entity
            }
          }
        }
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;
        //const repromptSpeech = response.reprompt.outputSpeech;

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);
          //expect(repromptSpeech.type).to.equal(expectedReprompt.type);
          //expect(repromptSpeech.ssml).to.equal(expectedReprompt.ssml);
          done();
        })
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should get inventory amount summary', (done) => {
      const intent = "InventoryAmountSummaryIntent";
      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>I only have one note. <break time="0.3s" /> We're running low on ethyl acetate.</speak>`
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
        }
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;
        //const repromptSpeech = response.reprompt.outputSpeech;

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);
          //expect(repromptSpeech.type).to.equal(expectedReprompt.type);
          //expect(repromptSpeech.ssml).to.equal(expectedReprompt.ssml);
          done();
        })
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
