import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import { browserHistory } from 'react-router';

class IntentApi {
  static getAllIntents() {
    return new Promise((resolve, reject) => {
        authenticatedSuperAgent('GET', `/api/intents`)
        .end(function(err, res) {
          if(err) {
            if(err.status === 401) {
              browserHistory.push('/admin/login');
            }
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getIntents(page, intentName) {
    return new Promise((resolve, reject) => {
      let url = `/api/intents/paged`;
      if(page) {
        url = `${url}?page=${page}`;
      } else {
        url = `${url}?page=1`;
      }
      if(intentName) {
        url = `${url}&name=${intentName}`;
      }
      authenticatedSuperAgent('GET', url)
      .end(function(err, res) {
        if(err) {
          if(err.status === 401) {
            browserHistory.push('/admin/login');
          }
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static getIntent(intent_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/intents/${intent_id}`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveIntent(intent) {
    const minIntentNameLength = 3;
    if (intent._id) {
      return new Promise((resolve, reject) => {
        if (intent.name.length < minIntentNameLength) {
          return reject(`Intent name must be at least ${minIntentNameLength} characters.`);
        }

        authenticatedSuperAgent('PUT', `/api/intents/${intent._id}`)
        .send(intent)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        if (intent.name.length < minIntentNameLength) {
          return reject(`Intent name must be at least ${minIntentNameLength} characters.`);
        }
        authenticatedSuperAgent('POST', `/api/intents`)
        .send(intent)
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
  static deleteIntent(intent) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/intents/${intent._id}`)
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

export default IntentApi;
