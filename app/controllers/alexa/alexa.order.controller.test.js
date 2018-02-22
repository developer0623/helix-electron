import _ from 'lodash';
import async from 'async';
import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import alexaApp from '../../../lib/alexa';
import { IntentLog } from '../../models';
import {
  ApplicationFactory,
  CompanyFactory,
  RepositoryFactory,
  RepositoryTypeFactory,
  UserFactory,
  InventoryItemFactory } from '../../../factories';
import {
  Entity,
  Repository
} from '../../models';
import * as entityTypes from '../../models/types/entityTypes';
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
let repositoryType;

describe('Alexa Ordering Inventory Items', () => {
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
        return RepositoryFactory.createRepository(company, entityTypes.INVENTORYITEM, attributes);
      })
      .then((createdRepository) => {
        repository = createdRepository;

        const attributes = {}
        return RepositoryTypeFactory.createRepositoryType(entityTypes.ORDERITEM);
      })
      .then((createdRepositoryType) => {
        repositoryType = createdRepositoryType;

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
  describe('ordering item in existing inventory', () => {
    const intent = "OrderIntent";
    const entityName = "Acetic Anhydride";

    it('confirms intent to reorder item', (done) => {
      const expectedSSML = `<speak>Ok. Please confirm, you want to reorder ${entityName}?</speak>`;
      const expectedOutput = {
        type: "SSML",
        ssml: expectedSSML
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
              "value": entityName
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

        IntentLog.find({}, function(err, intentLogs) {

          if (err) { done(err); }
          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

          done();
        });
      });
    });
    it('when intent is confirmed and an order repository does not exists, creates an order entity in a new repository', (done) => {
      let payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
          "slots": {
            "Entity": {
              "name": "Entity",
              "value": entityName
            }
          }
        }
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        payload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": intent,
            "confirmationStatus": "CONFIRMED",
            "slots": {
              "Entity": {
                "name": "Entity",
                "value": entityName
              }
            }
          }
        }
        return request(app)
        .post('/helix')
        .send(formatPayload(payload))
      })
      .then((res) => {
        expect(200);

        const expectedSSML = `<speak>Ok. I added ${entityName} to your order requests.</speak>`;
        const expectedOutput = {
          type: "SSML",
          ssml: expectedSSML
        }

        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        expect(outputSpeech.type).to.equal(expectedOutput.type);
        expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

        return IntentLog.find();
      })
      .then((intentLogs) => {
        expect(intentLogs.length).to.equal(2);

        return Repository.find({
          entity_type: entityTypes.ORDERITEM
        });
      })
      .then((repositories) => {
        expect(repositories.length).to.equal(1)

        return Entity.find({
          type: entityTypes.ORDERITEM
        });
      })
      .then((entities) => {
        expect(entities.length).to.equal(1)

        const entity = entities[0];

        expect(entity.name).to.equal(entityName);

        done();
      })
      .catch((err) => {
        done(err);
      });
    });
    it('when an intent is confirm and an order repository exists, creates an order entity and puts into existing order repository', (done) => {
      const repositoryName = "Existing Order Repository";

      RepositoryFactory.createRepository(company, entityTypes.ORDERITEM, {}, repositoryName)
      .then((repository) => {
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
                "value": entityName
              }
            }
          }
        }
        return request(app)
          .post('/helix')
          .send(formatPayload(payload));
      })
      .then((res) => {
        expect(200);

        const payload = {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": intent,
            "confirmationStatus": "CONFIRMED",
            "slots": {
              "Entity": {
                "name": "Entity",
                "value": entityName
              }
            }
          }
        }
        return request(app)
        .post('/helix')
        .send(formatPayload(payload))
      })
      .then((res) => {
        expect(200);

        const expectedSSML = `<speak>Ok. I added ${entityName} to your order requests.</speak>`;
        const expectedOutput = {
          type: "SSML",
          ssml: expectedSSML
        }

        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        expect(outputSpeech.type).to.equal(expectedOutput.type);
        expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

        return IntentLog.find();
      })
      .then((intentLogs) => {
        expect(intentLogs.length).to.equal(2);

        return Repository.find({
          entity_type: entityTypes.ORDERITEM
        });
      })
      .then((repositories) => {
        const repository = repositories[0];

        expect(repository.name).to.equal(repositoryName);

        return Entity.find({
          type: entityTypes.ORDERITEM
        });
      })
      .then((entities) => {
        const entity = entities[0];

        expect(entity.name).to.equal(entityName);

        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
