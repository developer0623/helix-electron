import _ from 'lodash';
import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import alexaApp from '../../../lib/alexa';
import { IntentLog } from '../../models';
import {
  ApplicationFactory,
  CompanyFactory,
  LabFactory,
  RepositoryFactory,
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

describe('Alexa Paging Controller', () => {
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

        done();
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
  describe('Paging Intent', () => {
    const intent = "PageIntent"
    it('should send an SMS when paging', (done) => {
      const expectedOutput = {
        type: "SSML",
        ssml: "<speak>Ok, I sent a text message to James</speak>"
      }
      const payload =  {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US",
        "intent": {
          "name": intent,
          "slots": {
            "Name": {
              "name": "Name",
              "value": "James"
            }
          }
        }
      }
      LabFactory.createLab(user)
      .then((lab) => {
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
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
