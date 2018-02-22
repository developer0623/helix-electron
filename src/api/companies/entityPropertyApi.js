import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import cookie from 'react-cookie';

const _validateEntityProperty = function(entityProperty) {
  const minEntityPropertyNameLength = 3;

  if (entityProperty.name.length < minEntityPropertyNameLength) {
    return {
      isValid: false,
      message: `Entity Property Name must be at least ${minEntityPropertyNameLength} characters.`
    };
  }

  return {
    isValid: true,
    message: null
  };
};
class EntityPropertyApi {
  static getAllEntityProperties(company_id, repository_id, page) {
    return new Promise((resolve, reject) => {
      const token = cookie.load('token');

      let url = `/api/companies/${company_id}/repositories/${repository_id}/entity_properties`;
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
  static saveEntity(company_id, repository_id, entityProperty) {
    const isValid = _validateEntityProperty(entityProperty);

    if (entityProperty._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          return reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', `/api/companies/${company_id}/repositories/${repository_id}/entity_properties/${entityProperty._id}`)
        .send(entityProperty)
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
          return reject(isValid.message);
        }
        authenticatedSuperAgent('POST', `/api/companies/${company_id}/repositories/${repository_id}/entity_properties`)
        .send(entityProperty)
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
  static deleteEntityProperty(company_id, repository_id,  entityProperty) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/companies/${company_id}/repositories/${repository_id}/entity_properties/${entityProperty._id}`)
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

export default EntityPropertyApi;
