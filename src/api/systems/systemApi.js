import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import cookie from 'react-cookie';

class SystemApi {
  static getSystem() {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', '/api/systems')
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveAttribute(attribute_name, attribute_value) {
    return new Promise((resolve, reject) => {
      const url = `/api/systems/attributes`;

      authenticatedSuperAgent('POST', url)
      .send({
        attribute_name: attribute_name,
        attribute_value: attribute_value
      })
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

export default SystemApi;
