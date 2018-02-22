import _ from 'lodash';
import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import alexaApp from '../../../lib/alexa';
import { IntentLog,
  UserContext } from '../../models';
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

let user;
let accessToken;
let application;
let company;

describe('Alexa Launch Controller', () => {
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

        return ApplicationFactory.createApplication(APPLICATION_ID, company, {
          default_launch_prompt: "What's up",
          default_launch_reprompt: "Ask me for help."
        });
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
  describe('Launch Helix', () => {
    const intent = "Launch"
    it('should return welcome message at launch request', (done) => {
      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>${application.default_launch_prompt}</speak>`
      }
      const payload = {
        "type": "LaunchRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US"
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
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should return reprompt at launch request', (done) => {
      const expectedOutput = {
        type: "SSML",
        ssml: `<speak>${application.default_launch_reprompt}</speak>`
      }
      const payload = {
        "type": "LaunchRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US"
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .expect(200)
      .then((res) => {
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.reprompt.outputSpeech;

        IntentLog.find({}, function(err, intentLogs) {
          if (err) { done(err); }
          expect(intentLogs.length).to.equal(1);
          expect(outputSpeech.type).to.equal(expectedOutput.type);
          expect(outputSpeech.ssml).to.equal(expectedOutput.ssml);

          done();
        });
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should find a user by access token and put into intent log', (done) => {
      const payload = {
        "type": "LaunchRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US"
      }
      UserFactory.createUserWithAccessToken()
      .then((user, accessToken) => {
        request(app)
        .post('/helix')
        .send(formatPayload(payload))
        .expect(200)
        .then((res) => {
          expect(res.body.response).to.be.an('object');
          const response = res.body.response;
          const outputSpeech = response.outputSpeech;

          IntentLog.find({})
          .populate('user')
          .exec()
          .then((intentLogs) => {
            expect(intentLogs.length).to.equal(1);

            const intentLog = intentLogs[0];

            expect(mongoose.Schema.Types.ObjectId(intentLog.user._id)).to.equal(mongoose.Schema.Types.ObjectId(user._id));

            done();
          })
          .catch((err) => {
            done(err);
          });
        })
        .catch((err) => {
          done(err);
        });
      })
      .catch((err) => {
        done(err);
      })
    });
    it('should find a user by access token and put into helix session', (done) => {
      const payload = {
        "type": "LaunchRequest",
        "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
        "timestamp": "2015-05-13T12:34:56Z",
        "locale": "en-US"
      }
      request(app)
      .post('/helix')
      .send(formatPayload(payload))
      .then((res) => {
        expect(200)
        expect(res.body.response).to.be.an('object');
        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        return UserContext.find({})
        .populate('user')
        .exec();
      })
      .then((contexts) => {
        expect(contexts.length).to.equal(1);
        const context = contexts[0];

        expect(mongoose.Schema.Types.ObjectId(context.user._id)).to.equal(mongoose.Schema.Types.ObjectId(user._id));

        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
