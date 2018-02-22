import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import uuidv1 from 'uuid/v1';
class RepositoryApi {
  static getRepositories(company_id, page, name) {
    return new Promise((resolve, reject) => {
      let url = `/api/companies/${company_id}/repositories/paged`;
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
  static getAllRepositories(company_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/companies/${company_id}/repositories`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getAllRepositoriesByType(company_id, repository_type) {
    return new Promise((resolve, reject) => {
      let url = `/api/companies/${company_id}/repositories/types/${repository_type}`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getRepository(company_id, repository_id) {
    return new Promise((resolve, reject) => {

      const url = `/api/companies/${company_id}/repositories/${repository_id}`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveRepository(company_id, repository) {
    const minRepositoryNameLength = 3;

    delete repository['properties'];

    if (repository._id) {
      return new Promise((resolve, reject) => {
        if (repository.name.length < minRepositoryNameLength) {
          return reject(`Repository name must be at least ${minRepositoryNameLength} characters.`);
        }
        const url = `/api/companies/${company_id}/repositories/${repository._id}`;

        authenticatedSuperAgent('PUT', url)
        .send(repository)
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
        if (repository.name.length < minRepositoryNameLength) {
          return reject(`Repository name must be at least ${minRepositoryNameLength} characters.`);
        }
        const url = `/api/companies/${company_id}/repositories`;

        authenticatedSuperAgent('POST', url)
        .send(repository)
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
  static deleteRepository(company_id, repository) {
    return new Promise((resolve, reject) => {
      const url = `/api/companies/${company_id}/repositories/${repository._id}`;

      authenticatedSuperAgent('DELETE', url)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }



  static uploadEntities(company_id, repository_id, data) {
    return new Promise((resolve, reject) => {

      authenticatedSuperAgent('POST', `/api/companies/${company_id}/repositories/${repository_id}/upload`)
      .send(data)
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

export default RepositoryApi;
