import expect from 'expect';
//import { createDB, destroyDB } from '../../test/test-helper';

describe('Our first test', () => {
  // beforeEach((done) => {
  //   createDB(() => {
  //     done();
  //   });
  // });
  // afterEach((done) => {
  //   destroyDB(() => {
  //     done();
  //   });
  // });
  it('should pass', () => {
    expect(true).toEqual(true);
  });
});
