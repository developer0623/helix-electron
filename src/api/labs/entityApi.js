import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import cookie from 'react-cookie';

const _validateEntity = function(entity) {
  const minEntityNameLength = 3;

  if (entity.name.length < minEntityNameLength) {
    return {
      isValid: false,
      message: `Name must be at least ${minEntityNameLength} characters.`
    };
  }

  return {
    isValid: true,
    message: null
  };
};
const _validateEntityProperty = function(entityProperty) {
  const minEntityPropertyNameLength = 3;

  if (entityProperty.name.length < minEntityPropertyNameLength) {
    return {
      isValid: false,
      message: `Property Name must be at least ${minEntityPropertyNameLength} characters.`
    };
  }

  return {
    isValid: true,
    message: null
  };
};
class EntityApi {
  static getEntity(lab_id, repository_id, entity_id) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', `/api/labs/${lab_id}/repositories/${repository_id}/entities/${entity_id}`)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static getAllEntities(lab_id, repository_id, type, page, name) {
    return new Promise((resolve, reject) => {
      const token = cookie.load('token');

      let url = `/api/labs/${lab_id}/repositories/${repository_id}/entities`;
      if(page) {
        url = `${url}?page=${page}`;
      } else {
        url = `${url}?page=1`;
      }
      if(name) {
        url = `${url}&name=${name}`;
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
  static saveEntity(lab_id, repository_id, entity) {
    const isValid = _validateEntity(entity);

    if (entity._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          return reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', `/api/labs/${lab_id}/repositories/${repository_id}/entities/${entity._id}`)
        .send(entity)
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
        authenticatedSuperAgent('POST', `/api/labs/${lab_id}/repositories/${repository_id}/entities`)
        .send(entity)
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
  static saveEntityProperty(lab_id, repository_id, entityProperty) {
    const isValid = _validateEntityProperty(entityProperty);

    if (entityProperty._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          return reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', `/api/labs/${lab_id}/repositories/${repository_id}/entity_properties/${entityProperty._id}`)
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
        authenticatedSuperAgent('POST', `/api/labs/${lab_id}/repositories/${repository_id}/entity_properties`)
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
  static deleteEntity(lab_id, repository_id, entity) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/labs/${lab_id}/repositories/${repository_id}/entities/${entity._id}`)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static deleteEntityProperty(lab_id, repository_id, entityProperty) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/labs/${lab_id}/repositories/${repository_id}/entity_properties/${entityProperty._id}`)
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

export default EntityApi;
