import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

const _validateSkillGroup = function(skill_group) {
  const minSkillGroupNameLength = 5;

  if (skill_group.skill_group_name.length < minSkillGroupNameLength) {
    return {
      isValid: false,
      message: `Skill Group Name must be at least ${minSkillGroupNameLength} characters.`
    };
  }

  return {
    isValid: true,
    message: null
  };
};
class SkillGroupApi {
  static getSkillGroup(company_id, skill_group_id) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', `/api/companies/${company_id}/skill_groups/${skill_group_id}`)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static getAllSkillGroups(company_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/companies/${company_id}/skill_groups`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveSkillGroup(company_id, skill_group) {
    const isValid = _validateSkillGroup(skill_group);

    if (skill_group._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', `/api/companies/${company_id}/skill_groups/${skill_group._id}`)
        .send(skill_group)
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
        authenticatedSuperAgent('POST', `/api/companies/${company_id}/skill_groups`)
        .send(skill_group)
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
  static deleteSkillGroup(company_id, skill_group) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/companies/${company_id}/skill_groups/${skill_group._id}`)
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

export default SkillGroupApi;
