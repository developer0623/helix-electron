import _ from 'lodash';
import express from 'express';
import { expect } from 'chai';
import request from 'supertest';
import { createDB, destroyDB, formatPayload } from '../../../test/test-helper';
import mongoose from 'mongoose';
import alexaApp from '../../../lib/alexa';
import natural from 'natural';
import IntentLog from '../../models/intent_log';

let app = express();
alexaApp.express({
  expressApp: app,
  checkCert: false,
  debug: true
});

describe('Alexa Abstract Controller', () => {
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

});
