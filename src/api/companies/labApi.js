import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

class LabApi {
  static getLabs(company_id, page) {
    return new Promise((resolve, reject) => {
      let url = `/api/companies/${company_id}/labs`;
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
  static getAllLabs(company_id) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', `/api/companies/${company_id}/labs`)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveLab(company_id, lab) {
    if (lab._id) {
      return new Promise((resolve, reject) => {
        authenticatedSuperAgent('PUT', `/api/companies/${company_id}/labs/${lab._id}`)
        .send(lab)
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
        authenticatedSuperAgent('POST', `/api/companies/${company_id}/labs`)
        .send(lab)
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
  static deleteLab(company_id, lab) {
    return new Promise((resolve, reject) => {
      const url = `/api/companies/${company_id}/labs/${lab._id}`;

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
  static saveLabMember(company_id, lab_id, labMember) {
    if (labMember._id) {
      return new Promise((resolve, reject) => {
        authenticatedSuperAgent('PUT', `/api/companies/${company_id}/labs/${lab_id}/lab_members/${labMember._id}`)
        .send(labMember)
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
        authenticatedSuperAgent('POST', `/api/companies/${company_id}/labs/${lab_id}/lab_members`)
        .send(labMember)
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
  static deleteLabMember(company_id, lab_id, labMember) {
    return new Promise((resolve, reject) => {
      const url = `/api/companies/${company_id}/labs/${lab_id}/lab_members/${labMember._id}`;

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

export default LabApi;
