import superagent from 'superagent';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
}
class MarketingLeadsApi {
  static saveMarketingLead(marketingLead) {
    return new Promise((resolve, reject) => {
      if (!validateEmail(marketingLead.email_address)) {
        return reject('Please submit a valid email address');
      }
      superagent('POST', '/api/marketing_leads')
      .send(marketingLead)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
}
export default MarketingLeadsApi;
