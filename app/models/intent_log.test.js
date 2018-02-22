import { expect } from 'chai';
import IntentLog from '../models/intent_log';

describe('IntentLog', () => {
  it('should be invalid if type is empty', (done) => {
    const intentLog = new IntentLog();

    intentLog.validate((err) => {
      expect(err.errors.type).to.exist;

      done();
    });
  });
  //slots
  it('should be invalid if application_id is empty', (done) => {
    const intentLog = new IntentLog();

    intentLog.validate((err) => {
      expect(err.errors.application_id).to.exist;

      done();
    });
  });
  it('should be invalid if session_id is empty', (done) => {
    const intentLog = new IntentLog();

    intentLog.validate((err) => {
      expect(err.errors.session_id).to.exist;

      done();
    });
  });
  it('should be invalid if request_id is empty', (done) => {
    const intentLog = new IntentLog();

    intentLog.validate((err) => {
      expect(err.errors.request_id).to.exist;

      done();
    });
  });
  it('should be invalid if locale is empty', (done) => {
    const intentLog = new IntentLog();

    intentLog.validate((err) => {
      expect(err.errors.locale).to.exist;

      done();
    });
  });
  it('should be invalid if raw_request is empty', (done) => {
    const intentLog = new IntentLog();

    intentLog.validate((err) => {
      expect(err.errors.raw_request).to.exist;

      done();
    });
  });
});
