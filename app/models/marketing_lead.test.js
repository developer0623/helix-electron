import { expect } from 'chai';
import MarketingLead from '../models/marketing_lead';

describe('MarketingLead', () => {
  it('should be invalid if email_address is empty', (done) => {
    const marketingLead = new MarketingLead();

    marketingLead.validate()
    .catch((err) => {
      expect(err.errors.email_address).to.exist;

      done();
    });
  });
  it('should be invalid if campaign is empty', (done) => {
    const marketingLead = new MarketingLead();

    marketingLead.validate()
    .catch((err) => {
      expect(err.errors.campaign).to.exist;

      done();
    });
  });
});
