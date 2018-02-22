import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

class ApplicationApi {
  static getApplications(company_id, page) {
    return new Promise((resolve, reject) => {
      let url = `/api/companies/${company_id}/applications`;
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
  static getAllApplications(company_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/companies/${company_id}/applications`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getApplication(company_id, application_id) {
    return new Promise((resolve, reject) => {

      const url = `/api/companies/${company_id}/applications/${application_id}`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveApplication(company_id, application) {
    const minApplicationNameLength = 3;

    if (application._id) {
      return new Promise((resolve, reject) => {
        if (application.name.length < minApplicationNameLength) {
          return reject(`Application Name must be at least ${minApplicationNameLength} characters.`);
        }
        const url = `/api/companies/${company_id}/applications/${application._id}`;

        authenticatedSuperAgent('PUT', url)
        .send(application)
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
        if (application.name.length < minApplicationNameLength) {
          return reject(`Application Name must be at least ${minApplicationNameLength} characters.`);
        }
        const url = `/api/companies/${company_id}/applications`;

        authenticatedSuperAgent('POST', url)
        .send(application)
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
  static deleteApplication(company_id, application) {
    return new Promise((resolve, reject) => {
      const url = `/api/companies/${company_id}/applications/${application._id}`;

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

export default ApplicationApi;
