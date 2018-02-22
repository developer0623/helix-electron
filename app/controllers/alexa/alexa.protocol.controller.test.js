import _ from 'lodash';
import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import alexaApp from '../../../lib/alexa';
import { IntentLog } from '../../models';
import { ApplicationFactory,
  CompanyFactory,
  RepositoryFactory,
  ProtocolFactory,
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

describe('Alexa Protocol Controller', () => {
  beforeEach((done) => {
    createDB(() => {
      done();
    });
  });
  afterEach((done) => {
    destroyDB(() => {
      done();
    });
  });
  describe('Getting a Protocol', () => {
    const intent = "ProtocolIntent";
    const newProtocol = {
      "protocol_name": 'E. coli Competent Cell Preparation',
      "steps": [{
        name: 'Inoculate 5ml of L-broth with a single colony of selected E. coli strain and incubate overnight at 37oC. with moderate agitation',
        can_remind: false
      }, {
        name: 'Inoculate 50ml of L-broth with ~100-300ml of the overnight culture and incubate at 37oC. with moderate agitiation(~250rpm) until the A595 equals 0.375',
        can_remind: false
      }]
    }
    it('should return a prompt for a known protocol', (done) => {
      let user;
      let accessToken;
      let application;
      let company;
      let repository;
      let protocol;

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

        return RepositoryFactory.createRepository(company, "PROTOCOL");
      })
      .then((createdRepository) => {
        repository = createdRepository;

        return ProtocolFactory.createProtocol(newProtocol, company, repository);
      })
      .then((createdProtocol) => {
        protocol = createdProtocol;

        const payload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": intent,
            "slots": {
              "ProtocolName": {
                "name": "ProtocolName",
                "value": protocol.name
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
        expect(res.body.response).to.be.an('object');

        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        let expectedSSML = '<speak>Ok. I can help you with that protocol. When you\'re ready, ask me for the first step.</speak>';

        const expectedOutput = {
          type: "SSML",
          ssml: expectedSSML
        }
        const expectedReprompt = {
          type: "SSML",
          ssml: "<speak>Try another?</speak>"
        }

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }
          expect(intentLogs.length).to.equal(1);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

          done();
        })
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should return a prompt with second step for a known protocol after first step is retreived', (done) => {
      let user;
      let accessToken;
      let application;
      let company;
      let repository;
      let protocol;

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

        return RepositoryFactory.createRepository(company, "PROTOCOL");
      })
      .then((createdRepository) => {
        repository = createdRepository;

        return ProtocolFactory.createProtocol(newProtocol, company, repository);
      })
      .then((protocol) => {
        const payload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": intent,
            "slots": {
              "ProtocolName": {
                "name": "ProtocolName",
                "value": protocol.name
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

        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        const nextStepIntent = "NextStepIntent";
        const nextPayload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": nextStepIntent,
          }
        }

        return request(app)
          .post('/helix')
          .send(formatPayload(nextPayload));
      })
      .then((res) => {
        expect(200)
        expect(res.body.response).to.be.an('object');

        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        let expectedSSML = '<speak>';
        expectedSSML += 'Next, ';
        expectedSSML += '<break time="0.5s" />';
        expectedSSML += newProtocol.steps[0].name;

        if (newProtocol.instructions) {
          expectedSSML += 'Finally, ';
          expectedSSML += newProtocol.instructions;
          expectedSSML += '.';
        }
        expectedSSML += '</speak>';

        const expectedOutput = {
          type: "SSML",
          ssml: expectedSSML
        }
        const expectedReprompt = {
          type: "SSML",
          ssml: "<speak>Try another?</speak>"
        }

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }

          expect(intentLogs.length).to.equal(2);
          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

          done();
        });
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should return a prompt with first step for a known protocol after first and second step is retreived', (done) => {
      let user;
      let accessToken;
      let application;
      let company;
      let repository;
      let protocol;

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

        return RepositoryFactory.createRepository(company, "PROTOCOL");
      })
      .then((createdRepository) => {
        repository = createdRepository;

        return ProtocolFactory.createProtocol(newProtocol, company, repository);
      })
      .then((protocol) => {
        const payload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": intent,
            "slots": {
              "ProtocolName": {
                "name": "ProtocolName",
                "value": protocol.name
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

        const nextStepIntent = "NextStepIntent";
        const nextPayload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": nextStepIntent,
          }
        }
        return request(app)
        .post('/helix')
        .send(formatPayload(nextPayload));
      })
      .then((res) => {
        expect(200);

        const nextStepIntent = "NextStepIntent";
        const nextPayload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": nextStepIntent,
          }
        }
        return request(app)
        .post('/helix')
        .send(formatPayload(nextPayload));
      })
      .then((res) => {
        expect(200);

        const previousStepIntent = "PreviousStepIntent";
        const previousPayload =  {
          "type": "IntentRequest",
          "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
          "timestamp": "2015-05-13T12:34:56Z",
          "locale": "en-US",
          "intent": {
            "name": previousStepIntent,
          }
        }
        return request(app)
        .post('/helix')
        .send(formatPayload(previousPayload));
      })
      .then((res) => {
        expect(200);
        expect(res.body.response).to.be.an('object');

        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        let expectedSSML = '<speak>';
        expectedSSML += 'The previous step is ';
        expectedSSML += '<break time="0.5s" />';
        expectedSSML += newProtocol.steps[0].name;

        if (newProtocol.instructions) {
          expectedSSML += 'Finally, ';
          expectedSSML += newProtocol.instructions;
          expectedSSML += '.';
        }
        expectedSSML += '</speak>';

        const expectedOutput = {
          type: "SSML",
          ssml: expectedSSML
        }
        const expectedReprompt = {
          type: "SSML",
          ssml: "<speak>Try another?</speak>"
        }

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }
          expect(intentLogs.length).to.equal(4);

          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

          done();
        });
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
