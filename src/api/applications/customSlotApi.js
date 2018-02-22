import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

const _validateCustomSlot = function(customSlot) {
  const minCustomSlotNameLength = 3;

  if (customSlot.name.length < minCustomSlotNameLength) {
    return {
      isValid: false,
      message: `Custom Slot Name must be at least ${minCustomSlotNameLength} characters.`
    };
  }
  return {
    isValid: true,
    message: null
  };
};
class CustomSlotApi {
  static getAllCustomSlots(application_id, page, name) {
    return new Promise((resolve, reject) => {
      let url = `/api/applications/${application_id}/custom_slots`;
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
  static saveCustomSlot(application_id, custom_slot) {
    const isValid = _validateCustomSlot(custom_slot);

    if (custom_slot._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          return reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', `/api/applications/${application_id}/custom_slots/${custom_slot._id}`)
        .send(custom_slot)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if(err) {
            reject(err);
          }
          resolve(res.body);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          reject(isValid.message);
        }
        authenticatedSuperAgent('POST', `/api/applications/${application_id}/custom_slots`)
        .send(custom_slot)
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
  static deleteCustomSlot(application_id, custom_slot) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', '/api/applications/${application_id}/custom_slots/' + custom_slot._id)
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
export default CustomSlotApi;
