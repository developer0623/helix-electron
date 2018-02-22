import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

class LabApi {
  static getLab(lab_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/labs/${lab_id}`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getAllLabs(page) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', '/api/labs')
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveLab(lab) {
    if (lab._id) {
      return new Promise((resolve, reject) => {
        authenticatedSuperAgent('PUT', '/api/labs/' + lab._id)
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
        authenticatedSuperAgent('POST', '/api/labs')
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
  static saveLabMember(labMember) {
    if (labMember._id) {
      return new Promise((resolve, reject) => {
        authenticatedSuperAgent('PUT', '/api/lab/lab_members/' + labMember._id)
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
        authenticatedSuperAgent('POST', '/api/lab/lab_members')
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
}

export default LabApi;
