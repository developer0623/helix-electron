import _ from 'lodash';
import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import alexaApp from '../../../lib/alexa';
import { IntentLog } from '../../models';
import {
  ApplicationFactory,
  CompanyFactory,
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

describe('Alexa Video Controller Controller', () => {
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
  const intent = "PlayVideoIntent"

  it('should play a video', (done) => {
    const expectedOutput = {
      type: "SSML",
      ssml: "<speak>I can now help you with your solutions and protocols. Just ask!</speak>"
    }
    const payload =  {
      "type": "IntentRequest",
      "requestId": "amzn1.echo-api.request.0000000-0000-0000-0000-00000000000",
      "timestamp": "2015-05-13T12:34:56Z",
      "locale": "en_us",
      "intent": {
        "name": intent
      }
    }
    request(app)
    .post('/helix')
    .send(formatPayload(payload))
    .expect(200)
    .then((res) => {
      expect(res.body.response).to.be.an('object');
      console.log(JSON.stringify(res.body.response));

      const response = res.body.response;
      const videoDirective = response.directives[0];


      IntentLog.find({}, function(err, intentLogs) {
        if (err) { done(err); }
        expect(intentLogs.length).to.equal(1);
        expect(videoDirective.type).to.equal("VideoApp.Launch");
        expect(videoDirective.videoItem.source).to.equal("https://s3.amazonaws.com/helix-io-dev/videos/Overview+of+New+England+Biolabs.mp4");

        done();
      });
    })
    .catch((err) => {
      done(err);
    });
  });
});
