import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

class RepositoryApi {
  static getRepositories(lab_id, page, name) {
    return new Promise((resolve, reject) => {
      let url = `/api/labs/${lab_id}/repositories/paged`;
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
  static getAllRepositories(lab_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/labs/${lab_id}/repositories`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getAllRepositoriesByType(lab_id, repository_type) {
    return new Promise((resolve, reject) => {
      let url = `/api/labs/${lab_id}/repositories/types/${repository_type}`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getRepository(lab_id, repository_id) {
    return new Promise((resolve, reject) => {

      const url = `/api/labs/${lab_id}/repositories/${repository_id}`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveRepository(lab_id, repository) {
    const minRepositoryNameLength = 3;

    if (repository._id) {
      return new Promise((resolve, reject) => {
        if (repository.name.length < minRepositoryNameLength) {
          return reject(`Repository name must be at least ${minRepositoryNameLength} characters.`);
        }
        const url = `/api/labs/${lab_id}/repositories/${repository._id}`;

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
        const url = `/api/labs/${lab_id}/repositories`;

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
  static addRepository(lab_id, repository_id) {
    return new Promise((resolve, reject) => {
      const url = `/api/labs/${lab_id}/repositories/add`;

      authenticatedSuperAgent('POST', url)
      .send({
        repository_id
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
  static deleteRepository(lab_id, repository) {
    return new Promise((resolve, reject) => {
      const url = `/api/labs/${lab_id}/repositories/${repository._id}`;

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
}

export default RepositoryApi;
