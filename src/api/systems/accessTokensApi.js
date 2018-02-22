import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

class AccessTokenApi {
  static getAllAccessTokens(page) {
    return new Promise((resolve, reject) => {
      let url = '/api/access_tokens';
      if(page) {
        url = `${url}?page=${page}`;
      } else {
        url = `${url}?page=1`;
      }
      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveAccessToken(accessToken) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('POST', '/api/access_tokens')
      .send(accessToken)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static deleteAccessToken(accessToken) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', '/api/access_tokens/' + accessToken._id)
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

export default AccessTokenApi;
