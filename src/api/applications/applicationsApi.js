import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import cookie from 'react-cookie';

class ApplicationApi {
  static getApplication(application_id) {
    return new Promise((resolve, reject) => {
      const url = `/api/applications/${application_id}`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getApplications(page, application_name) {
    return new Promise((resolve, reject) => {
      let url = `/api/applications`;
      if(page) {
        url = `${url}?page=${page}`;
      } else {
        url = `${url}?page=1`;
      }
      if(application_name) {
        url = `${url}&name=${application_name}`;
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
  static saveApplication(application) {
    const minApplicationNameLength = 3;

    if (application._id) {
      return new Promise((resolve, reject) => {
        if (application.name.length < minApplicationNameLength) {
          reject(`Application Name must be at least ${minApplicationNameLength} characters.`);
        }
        const url = `/api/applications/${application._id}`;

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
          reject(`Application Name must be at least ${minApplicationNameLength} characters.`);
        }
        const url = `/api/applications`;

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
  static deleteApplication(application) {
    return new Promise((resolve, reject) => {
      const url = `/api/applications/${application._id}`;

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
  static getApplicationBuilds(application_id, page) {
    return new Promise((resolve, reject) => {
      let url = `/api/applications/${application_id}/builds`;
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
  static startApplicationBuild(application_id) {
    return new Promise((resolve, reject) => {
      const url = `/api/applications/${application_id}/builds`;

      authenticatedSuperAgent('POST', url)
      .send()
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
