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
  KnowledgeBaseFactory,
  UserFactory } from '../../../factories';
import {
  createDB,
  destroyDB,
  formatPayload } from '../../../test/test-helper';
import { expect } from 'chai';
import tree from '../../../services/pubchem.parsetree';

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

describe('Alexa Lookup Controller', () => {
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

        const attributes = {
          properties: [{
            "custom_slot_type": "PROPERTY",
            "name_lower": "molecular weight",
            "name": "Molecular Weight",
            "synonyms": []
          }]
        }
        return RepositoryFactory.createRepository(company, "KNOWLEDGEBASE", attributes);
      })
      .then((createdRepository) => {
        repository = createdRepository;

        const chemicals = [{
          name: "sodium chloride",
          attributeName: "molecular weight",
          attributeValue: "58.44",
          attributePrompt: "58.44 g/mol"
        }, {
          name: "Xenon",
          attributeName: "molecular weight",
          attributeValue: "131.293",
          attributePrompt: "131.293 g/mol"
        }, {
          name: "Rhodium",
          attributeName: "molecular weight",
          attributeValue: "102.906",
          attributePrompt: "102.906 g/mol"
        }];

        async.each(chemicals, (chemical, callback) => {
          const entity = {
            name: chemical.name
          };
          const attributes = {
            properties: [{
              key: chemical.attributeName,
              value: chemical.attributePrompt
            }]
          };

          KnowledgeBaseFactory.createEntity(entity.name, attributes, company, repository)
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
  describe('Lookup a Value', () => {
    const intent = "LookUpIntent";

    it('should return molecular weight for known compound', (done) => {
      const compoundName = "sodium chloride";
      const attributeName = "Molecular Weight";
      const attributePrompt = "58.44 g/mol"

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>The ${attributeName} of ${compoundName} is ${attributePrompt}</speak>`
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
              "value": compoundName
            },
            "Property": {
              "name": "Property",
              "value": attributeName
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
      })
    });
    it('should return molecular weight for known chemical symbol', (done) => {
      const chemicalName = "Xenon";
      const attributeName = "Molecular Weight";
      const attributePrompt = "131.293 g/mol"

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>The ${attributeName} of ${chemicalName} is ${attributePrompt}</speak>`
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en_us",
        "intent": {
          "name": intent,
          "slots": {
            "Entity": {
              "name": "Entity",
              "value": chemicalName
            },
            "Property": {
              "name": "Property",
              "value": attributeName
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
    it('should return molecular weight for known chemical name', (done) => {
      const chemicalName = "Rhodium";
      const attributeName = "Molecular Weight";
      const attributePrompt = "102.906 g/mol"

      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>The ${attributeName} of ${chemicalName} is ${attributePrompt}</speak>`
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en_us",
        "intent": {
          "name": intent,
          "slots": {
            "Property": {
              "name": "Property",
              "value": attributeName
            },
            "Entity": {
              "name": "Entity",
              "value": chemicalName
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
    // it('should return molecular weight for known compound when the compound has extra spaces', (done) => {
    //   const compoundNameWithSpaces = " Na Cl ";
    //   const compoundName = "NaCl";
    //   const compoundNamePrompt = "Sodium Chloride";
    //   const attributeName = "Molecular Weight";
    //   const attributeValue = "58.442707"
    //   const attributePrompt = "58.442707 grams per mole"
    //
    //   const expectedOutput = {
    //     type: "SSML",
    //     ssml: "<speak>The Molecular Weight of Sodium Chloride is 58.442707 grams per mole.</speak>"
    //   }
    //   const payload =  {
    //     "type": "IntentRequest",
    //     "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
    //     "timestamp": "2015-05-13T12:34:56Z",
    //     "locale": "en_us",
    //     "intent": {
    //       "name": intent,
    //       "slots": {
    //         "Property": {
    //           "name": "Property",
    //           "value": attributeName
    //         },
    //         "Entity": {
    //           "name": "Entity",
    //           "value": compoundNameWithSpaces
    //         }
    //       }
    //     }
    //   }
    //   request(app)
    //   .post('/helix')
    //   .send(formatPayload(payload))
    //   .expect(200)
    //   .then((res) => {
    //     expect(res.body.response).to.be.an('object');
    //
    //     const response = res.body.response;
    //     const outputSpeech = response.outputSpeech;
    //
    //     IntentLog.find({}, function(err, intentLogs) {
    //       if (err) { done(err); }
    //
    //       expect(intentLogs.length).to.equal(1);
    //
    //       expect(outputSpeech.type).to.equal(expectedOutput.type);
    //       expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);
    //
    //       done();
    //     });
    //   });
    // });
    it('should return molecular weight for known chemical symbol when the symbol has extra spaces', (done) => {
      const chemicalName = "Xenon";
      const attributeName = "Molecular Weight";
      const attributeValue = "131.293"
      const attributePrompt = "131.293 g/mol"

      const expectedOutput = {
        type: "SSML",
        ssml: "<speak>The Molecular Weight of Xenon is 131.293 g/mol</speak>"
      }
      const expectedReprompt = {
        type: "SSML",
        ssml: "<speak>Try another?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en_us",
        "intent": {
          "name": intent,
          "slots": {
            "Property": {
              "name": "Property",
              "value": attributeName
            },
            "Entity": {
              "name": "Entity",
              "value": chemicalName
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
    it('should return molecular weight for known chemical name when the name has extra spaces', (done) => {
      const chemicalNameWithSpaces = " Rhodium ";
      const chemicalName = "Rhodium";
      const attributeName = "Molecular Weight";
      const attributeValue = "102.906"
      const attributePrompt = "102.906 g/mol"

      const expectedOutput = {
        type: "SSML",
        ssml: "<speak>The Molecular Weight of Rhodium is 102.906 g/mol</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en_us",
        "intent": {
          "name": intent,
          "slots": {
            "Property": {
              "name": "Property",
              "value": attributeName
            },
            "Entity": {
              "name": "Entity",
              "value": chemicalNameWithSpaces
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
    it('should handle unknown compound gracefully', (done) => {
      const chemicalName = "Rhodium";
      const attributeName = "Molecular Weight";
      const attributeValue = "102.906"
      const attributePrompt = "102.906 g/mol"

      const compoundName = "Unknown Compound";
      const expectedOutput = {
        type: "SSML",
        ssml: "<speak>What are you looking for?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en_us",
        "intent": {
          "name": intent,
          "slots": {
            "Property": {
              "name": "Property",
              "value": "molecular weight"
            },
            "Entity": {
              "name": "Entity",
              "value": compoundName
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
    it('should handle missing compound gracefully', (done) => {
      const chemicalName = "Rhodium";
      const attributeName = "Molecular Weight";
      const attributeValue = "102.906"
      const attributePrompt = "102.906 g/mol"

      const compoundName = null;
      const expectedOutput = {
        type: "SSML",
        ssml: "<speak>I didn't quite get that. What are you looking for again?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en_us",
        "intent": {
          "name": intent,
          "slots": {
            "Property": {
              "name": "Property",
              "value": "molecular weight"
            },
            "Entity": {
              "name": "Entity",
              "value": compoundName
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
    it('should handle missing lookup gracefully', (done) => {
      const chemicalName = "Rhodium";
      const attributeName = "Molecular Weight";
      const attributeValue = "102.906"
      const attributePrompt = "102.906 g/mol"

      const compoundName = "Na";
      const expectedOutput = {
        type: "SSML",
        ssml: "<speak>Which property?</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en_us",
        "intent": {
          "name": intent,
          "slots": {
            "Entity": {
              "name": "Entity",
              "value": chemicalName
            },
            "Property": {
              "name": "Property",
              "value": null
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
  });
});
