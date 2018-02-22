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

let app = express();
app.use('/api', require('../../../lib/api'));

let user;
let accessToken;
let company;

describe('Lab Controller', () => {
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
  describe('Create', () => {
    it('should create a lab', (done) => {
      const lab = {
        lab_name: "Test Lab",
        description: "Test Description",
        owner: company._id
      }
      request(app)
      .post(`/api/companies/${company._id}/labs`)
      .set('AUTHORIZATION', 'Bearer ' + accessToken)
      .send(lab)
      .expect(201)
      .then((res) => {
        console.log(res.body.response);

        expect(res.body.response).to.be.an('object');

        const response = res.body.response;
        const outputSpeech = response.outputSpeech;

        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
