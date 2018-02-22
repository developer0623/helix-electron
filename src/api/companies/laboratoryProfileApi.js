import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

const _validateLaboratoryProfile = function(laboratory_profile) {
  const minProfileNameLength = 5;

  if (laboratory_profile.profile_name.length < minProfileNameLength) {
    return {
      isValid: false,
      message: `Profilei Name must be at least ${minProfileNameLength} characters.`
    };
  }

  return {
    isValid: true,
    message: null
  };
};
class LaboratoryProfileApi {
  static getLaboratoryProfile(company_id, laboratory_profile_id) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', `/api/companies/${company_id}/laboratory_profiles/${laboratory_profile_id}`)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static getAllLaboratoryProfiles(company_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/companies/${company_id}/laboratory_profiles`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveLaboratoryProfile(company_id, laboratory_profile) {
    const isValid = _validateLaboratoryProfile(laboratory_profile);

    if (laboratory_profile._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', `/api/companies/${company_id}/laboratory_profiles/${laboratory_profile._id}`)
        .send(laboratory_profile)
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
          reject(isValid.message);
        }
        authenticatedSuperAgent('POST', `/api/companies/${company_id}/laboratory_profiles`)
        .send(laboratory_profile)
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
  static deleteLaboratoryProfile(company_id, laboratory_profile) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/companies/${company_id}/laboratory_profiles/${laboratory_profile._id}`)
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

export default LaboratoryProfileApi;
