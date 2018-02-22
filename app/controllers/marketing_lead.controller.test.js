import _ from 'lodash';
import express from 'express';
import { expect } from 'chai';
import request from 'supertest';
import { createDB, destroyDB } from '../../test/test-helper';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import MarketingLead from '../models/marketing_lead';

let app = express();
app.use(compression())
 //.use(favicon(icon))
 //.use(logs(config.verbose))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('../../lib/api'));

function createMarketingLeads(numberToCreate) {
  let accumulator = [];

  return new Promise((resolve, reject) => {
    _.times(numberToCreate, (index) => {
      const marketingLead = new MarketingLead();
      marketingLead.email_address = 'anon+' + index + '@helix.io';
      marketingLead.campaign = 'Launch Helix';

      accumulator.push(marketingLead);
    });
    Promise.all(_.map(accumulator, (marketingLead) => {
        marketingLead.save();
      })
    )
    .then((marketingLeads) => {
      resolve(marketingLeads);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
describe('Alexa Controller', () => {
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
  it('should save email address and campaign when creating a new marketing lead', (done) => {
    const expected = {
      email_address: 'james@askhelix.io',
      campaign: 'Launch Helix'
    }
    request(app)
    .post('/api/marketing_leads')
    .send({
      email_address: expected.email_address,
      campaign: expected.campaign
    })
    .expect(201)
    .then((res) => {
      expect(res.body).to.be.an('object');
      const response = res.body;

      MarketingLead.find({email_address: expected.email_address})
      .then((marketingLeads) => {
        expect(marketingLeads.length).to.equal(1);

        const marketingLead = marketingLeads[0];

        expect(marketingLead.email_address).to.equal(expected.email_address);
        expect(marketingLead.campaign).to.equal(expected.campaign);

        done();
      })
      .catch((err) => {
        done(err);
      })
    })
    .catch((err) => {
      done(err);
    });
  });
  it('should update an existing marketing lead when updated', (done) => {
    const expected = {
      first_name: 'James',
      last_name: 'Rhodes',
      company_name: 'Berry College',
      email_address: 'james_update@askhelix.io',
      campaign: 'Launch Helix Updated'
    }
    const marketingLead = new MarketingLead();
    marketingLead.email_address = 'james@helix.io';
    marketingLead.campaign = 'Launch Helix';

    marketingLead.save()
    .then((marketingLead) => {
      request(app)
      .put('/api/marketing_leads/' + marketingLead._id)
      .send(expected)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        const response = res.body;

        MarketingLead.find({email_address: expected.email_address})
        .then((marketingLeads) => {
          expect(marketingLeads.length).to.equal(1);
          const marketingLead = marketingLeads[0];

          expect(marketingLead.first_name).to.equal(expected.first_name);
          expect(marketingLead.last_name).to.equal(expected.last_name);
          expect(marketingLead.company_name).to.equal(expected.company_name);
          expect(marketingLead.email_address).to.equal(expected.email_address);
          expect(marketingLead.campaign).to.equal(expected.campaign);

          done();
        })
        .catch((err) => {
          done(err);
        })
      })
      .catch((err) => {
        done(err);
      });
    })
    .catch((err) => {
      done(err);
    })
  });
  it('should return all marketing leads when getting', (done) => {
    const numberToCreate = 120;

    createMarketingLeads(numberToCreate)
    .then((createdMarketingLeads) => {
      request(app)
      .get('/api/marketing_leads')
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        const response = res.body;

        MarketingLead.find({})
        .then((marketingLeads) => {
          expect(marketingLeads.length).to.equal(numberToCreate);

          done();
        })
        .catch((err) => {
          done(err);
        })
      })
      .catch((err) => {
        done(err);
      });
    })
    .catch((err) => {
      done(err);
    });
  });
  it('should return marketing lead when getting a marketing lead', (done) => {
    const numberToCreate = 120;

    createMarketingLeads(numberToCreate)
    .then((createdMarketingLead) => {
      const expected = new MarketingLead();
      expected.first_name = 'James'
      expected.last_name = 'Rhodes'
      expected.company_name = 'Berry College'
      expected.email_address = 'james@helix.io';
      expected.campaign = 'Launch Helix';

      expected.save()
      .then((addedMarketingLead) => {
        request(app)
        .get('/api/marketing_leads/' + addedMarketingLead._id)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('object');
          const response = res.body;

          MarketingLead.find({ email_address: expected.email_address })
          .then((marketingLeads) => {
            expect(marketingLeads.length).to.equal(1);

            const marketingLead = marketingLeads[0];

            expect(marketingLead.first_name).to.equal(expected.first_name);
            expect(marketingLead.last_name).to.equal(expected.last_name);
            expect(marketingLead.company_name).to.equal(expected.company_name);
            expect(marketingLead.email_address).to.equal(expected.email_address);
            expect(marketingLead.campaign).to.equal(expected.campaign);

            done();
          })
          .catch((err) => {
            done(err);
          })
        })
        .catch((err) => {
          done(err);
        });
      });
    })
    .catch((err) => {
      done(err);
    });
  });
  it('should delete marketing lead from database when deleting', (done) => {
    const numberToCreate = 120;

    createMarketingLeads(numberToCreate)
    .then((createdMarketingLead) => {
      const expected = new MarketingLead();
      expected.first_name = 'James'
      expected.last_name = 'Rhodes'
      expected.company_name = 'Berry College'
      expected.email_address = 'james@helix.io';
      expected.campaign = 'Launch Helix';

      expected.save()
      .then((addedMarketingLead) => {
        request(app)
        .delete('/api/marketing_leads/' + addedMarketingLead._id)
        .expect(204)
        .then((res) => {
          expect(res.body).to.be.an('object');
          const response = res.body;

          MarketingLead.find({ email_address: expected.email_address })
          .then((marketingLeads) => {
            expect(marketingLeads.length).to.equal(0);

            done();
          })
          .catch((err) => {
            done(err);
          })
        })
        .catch((err) => {
          done(err);
        });
      });
    })
    .catch((err) => {
      done(err);
    });
  });
});
