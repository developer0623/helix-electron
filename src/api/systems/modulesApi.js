import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import { browserHistory } from 'react-router';

class ModulesApi {
  static getAllModules() {
    return new Promise((resolve, reject) => {
        authenticatedSuperAgent('GET', `/api/systems/modules`)
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
  static getModulesPaged(page) {
    return new Promise((resolve, reject) => {
        authenticatedSuperAgent('GET', `/api/systems/modules/paged?page=${page}`)
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
  static saveModule(module) {
    const minModuleNameLength = 3;
    if (module._id) {
      return new Promise((resolve, reject) => {
        if (module.name.length < minModuleNameLength) {
          return reject(`Module name must be at least ${minModuleNameLength} characters.`);
        }

        authenticatedSuperAgent('PUT', `/api/systems/modules/${module._id}`)
        .send(module)
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
        if (module.name.length < minModuleNameLength) {
          return reject(`Module name must be at least ${minModuleNameLength} characters.`);
        }
        authenticatedSuperAgent('POST', `/api/systems/modules`)
        .send(module)
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
  static deleteModule(module) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/systems/modules/${module._id}`)
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

export default ModulesApi;
