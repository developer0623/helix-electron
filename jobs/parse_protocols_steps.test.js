import fs from 'fs';
import chai from 'chai';
import ParseProtocolSteps from './parse_protocol_steps';
import ProtocolFactory from '../factories/protocol.factory';
import UserFactory from '../factories/user.factory';
import { createDB, destroyDB, formatPayload } from '../test/test-helper';
import mongoose from 'mongoose';
import _ from 'lodash';

const expect = chai.expect;

const newProtocol = {
  "protocol_name": 'E. coli Competent Cell Preparation',
  "steps": [{
    name: 'Inoculate 5ml of L-broth with a single colony of selected E. coli strain and incubate overnight at 37oC. with moderate agitation',
    say_as: 'Inoculate 5ml of L-broth with a single colony of selected E. coli strain and incubate overnight at 37oC. with moderate agitation',
    can_remind: false
  }, {
    name: 'Inoculate 50ml of L-broth with ~100-300ml of the overnight culture and incubate at 37°C. with moderate agitiation(~250rpm) until the A595 equals 0.375',
    say_as: 'Inoculate 50ml of L-broth with ~100-300ml of the overnight culture and incubate at 37°C. with moderate agitiation(~250rpm) until the A595 equals 0.375',
    can_remind: false
  }]
}

describe('ParseProtocolSteps', () => {
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
  it('should return parsed steps actions', (done) => {
    ProtocolFactory.createProtocol(newProtocol)
    .then((protocol) => {
      return ParseProtocolSteps.parseProtocolSteps(protocol._id);
    })
    .then((protocol) => {
      _.forEach(protocol.steps, (step) => {
        const actions = step.step_action;

        console.log(`PROTOCOL: ${protocol}`);
        _.forEach(actions, (action) => {
          console.log(action);
        }, (err) => {
          if(err) { done(err); }

          done();
        });
      });
    })
    .catch((err) => {
      console.log(`${err}: ${err.stack}`);
    })
  });
});
