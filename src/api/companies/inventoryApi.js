import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';
import uuidv1 from 'uuid/v1';

class InventoryApi {
  static getAllInventories(company_id) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', `/api/companies/${company_id}/inventories`)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveInventory(company_id, repository) {
    const minRepositoryNameLength = 3;

    if (repository._id) {
      return new Promise((resolve, reject) => {
        if (repository.name.length < minRepositoryNameLength) {
          return reject(`Inventory name must be at least ${minRepositoryNameLength} characters.`);
        }
        const url = `/api/companies/${company_id}/inventories/${repository._id}`;

        authenticatedSuperAgent('PUT', url)
        .send(repository)
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
        if (repository.name.length < minRepositoryNameLength) {
          return reject(`Repository name must be at least ${minRepositoryNameLength} characters.`);
        }
        const url = `/api/companies/${company_id}/inventories`;

        authenticatedSuperAgent('POST', url)
        .send(repository)
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
  static deleteInventory(company_id, repository) {
    return new Promise((resolve, reject) => {
      const url = `/api/companies/${company_id}/inventories/${repository._id}`;

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
  static uploadInventory(company_id, repository_id, arrayBuffer) {
    const uuid = uuidv1();
    const uploadParts = [];
    const chunkSize = 0x2000;
    const totalChunks = Math.ceil(arrayBuffer.byteLength / chunkSize);
    for (let chunk = 0; chunk < totalChunks; chunk++) {
      const begin = chunk * chunkSize;
      const end = begin + chunkSize;
      const part = {
        uuid,
        data: new Uint8Array(arrayBuffer.slice(begin, end)),
        chunk,
        totalChunks,
        chunkSize
      };
      uploadParts.push(new Promise((resolve, reject) => {
        authenticatedSuperAgent('POST', `/api/companies/${company_id}/inventories/${repository_id}/uploads`)
          .send(part)
          .set('Content-Type', 'application/json')
          .end(function(err, res) {
            if (err) {
              return reject(err);
            }
            resolve(res.body);
          });
      }));
    }
    return Promise.all(uploadParts);
  }
}

export default InventoryApi;
