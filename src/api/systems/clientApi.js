import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

const _validateClient = function(client) {
  const minClientNameLength = 3;
  const minClientIdLength = 5;
  const minSecretLength = 5;

  if (client.name.length < minClientNameLength) {
    return {
      isValid: false,
      message: `Client Name must be at least ${minClientNameLength} characters.`
    };
  }
  if (client.client_id.length < minClientIdLength) {
    return {
      isValid: false,
      message: `Client Id must be at least ${minClientIdLength} characters.`
    };
  }
  if (client.secret.length < minSecretLength) {
    return {
      isValid: false,
      message: `Secret must be at least ${minSecretLength} characters.`
    };
  }
  return {
    isValid: true,
    message: null
  };
};
class ClientApi {
  static getAllClients(page, clientName) {
    return new Promise((resolve, reject) => {
      let url = '/api/clients';
      if(page) {
        url = `${url}?page=${page}`;
      } else {
        url = `${url}?page=1`;
      }
      if(clientName) {
        url = `${url}&name=${clientName}`;
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
  static getClient(client_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/clients/${client_id}`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveClient(client) {
    const isValid = _validateClient(client);

    if (client._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          return reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', '/api/clients/' + client._id)
        .send(client)
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
        if (!isValid) {
          return reject(isValid.message);
        }
        authenticatedSuperAgent('POST', '/api/clients')
        .send(client)
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
  static deleteClient(client) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', '/api/clients/' + client._id)
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
export default ClientApi;
