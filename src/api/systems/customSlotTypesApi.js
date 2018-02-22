import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import { browserHistory } from 'react-router';

class CustomSlotTypesApi {
  static getCustomSlotType(custom_slot_type_id) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', `/api/systems/custom_slot_types/${custom_slot_type_id}`)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static getAllCustomSlotTypes() {
    return new Promise((resolve, reject) => {
        authenticatedSuperAgent('GET', `/api/systems/custom_slot_types`)
        .end(function(err, res) {
          if(err) {
            if(err.status === 401) {
              browserHistory.push('/admin/login');
            }
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getCustomSlotTypesPaged(page, customSlotTypeName) {
    return new Promise((resolve, reject) => {
      let url = '/api/systems/custom_slot_types/paged';
      if(page) {
        url = `${url}?page=${page}`;
      } else {
        url = `${url}?page=1`;
      }
      if(customSlotTypeName) {
        url = `${url}&name=${customSlotTypeName}`;
      }
      authenticatedSuperAgent('GET', url)
      .end(function(err, res) {
        if(err) {
          if(err.status === 401) {
            return browserHistory.push('/admin/login');
          }
          reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static saveCustomSlotType(custom_slot_type) {
    const minCustomSlotTypeNameLength = 3;
    if (custom_slot_type._id) {
      return new Promise((resolve, reject) => {
        if (custom_slot_type.name.length < minCustomSlotTypeNameLength) {
          return reject(`Custom Slot name must be at least ${minCustomSlotTypeNameLength} characters.`);
        }

        authenticatedSuperAgent('PUT', `/api/systems/custom_slot_types/${custom_slot_type._id}`)
        .send(custom_slot_type)
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
        if (custom_slot_type.name.length < minCustomSlotTypeNameLength) {
          return reject(`Custom Slot name must be at least ${minCustomSlotTypeNameLength} characters.`);
        }
        authenticatedSuperAgent('POST', `/api/systems/custom_slot_types`)
        .send(custom_slot_type)
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
  static deleteCustomSlotType(custom_slot_type) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/systems/custom_slot_types/${custom_slot_type._id}`)
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

export default CustomSlotTypesApi;
