import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import { browserHistory } from 'react-router';

class RepositoryTypesApi {
  static getRepositoryType(repository_type_id) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', `/api/systems/repository_types/${repository_type_id}`)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static getAllRepositoryTypes() {
    return new Promise((resolve, reject) => {
        authenticatedSuperAgent('GET', `/api/systems/repository_types`)
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
  static getRepositoryTypesPaged(page, name) {
    return new Promise((resolve, reject) => {
      let url = `/api/systems/repository_types/paged`;
      if(page) {
        url = `${url}?page=${page}`;
      } else {
        url = `${url}?page=1`;
      }
      if(name) {
        url = `${url}&name=${name}`;
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
  static saveRepositoryType(repository_type) {
    const minRepositoryTypeNameLength = 3;
    if (repository_type._id) {
      return new Promise((resolve, reject) => {
        if (repository_type.type_name.length < minRepositoryTypeNameLength) {
          return reject(`Repository Type type name must be at least ${minRepositoryTypeNameLength} characters.`);
        }

        authenticatedSuperAgent('PUT', `/api/systems/repository_types/${repository_type._id}`)
        .send(repository_type)
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
        if (repository_type.type_name.length < minRepositoryTypeNameLength) {
          return reject(`Repository Type type name must be at least ${minRepositoryTypeNameLength} characters.`);
        }
        authenticatedSuperAgent('POST', `/api/systems/repository_types`)
        .send(repository_type)
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
  static deleteRepositoryType(repository_type) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/systems/repository_types/${repository_type._id}`)
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

export default RepositoryTypesApi;
