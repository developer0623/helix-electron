import superagent from 'superagent';
import authenticatedSuperAgent from './authenticatedSuperAgent';

class OAuth2Api {
  static grantCode(credentials) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}

export default OAuth2Api;
