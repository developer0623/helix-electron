import xlsx from 'xlsx';
import _ from 'lodash';

import queues from '../lib/queues';
import config from '../src/config';
import InventoryUpload from '../app/models/inventoryUpload';
import Entity from '../app/models/entity';

import PublishManager from '../app/managers/publish_manager';

const MAX_RETRY_COUNT = 5;

const log = (msg) => {console.log(msg);}; // eslint-disable-line no-console

const ImportQuartzyInventory = {
  saveData: function(user, repository, inventoryItems) {
    return Promise.all(inventoryItems.map((item) => {
      const entity = new Entity();

      entity.type = "INVENTORYITEM";
      entity.name = item['Item Name *'];
      entity.name_lower = entity.name.toLowerCase();
      entity.owner = repository.owner;
      entity.repository = repository;

      let properties = [];
      let keys = [
        'Serial Number',
        'Vendor Name',
        'Catalog Number',
        'Location',
        'Sub-Location',
        'Price',
        'Quantity',
        'Unit Size',
        'Expiration Date',
        'Lot Number',
        'CAS Number'
      ];
      _.forEach(keys, (key) => {
        if(item[key]) {
          properties.push({
            key: key,
            value: item[key]
          });
        }
      });
      entity.attributes = {
        properties
      }

      return entity.save();
    }));
  },
  getItems: function(data) {
    const inventory = [];
    const parsedData = xlsx.read(data);
    parsedData['SheetNames']
      .filter(sheetName => sheetName !== 'Instructions')
      .forEach(sheetName => {
        xlsx.utils.sheet_to_json(parsedData['Sheets'][sheetName]).forEach(inventoryItem => {
          inventory.push(Object.assign({
            itemType: sheetName
          }, inventoryItem));
        });
      });
    return inventory;
  },
  collateUploadsIfReady(inventoryUploads) {
    const totalChunks = inventoryUploads[0].totalChunks;
    const chunkSize = inventoryUploads[0].chunkSize; // chunkSize is hard-coded in the client
    if (inventoryUploads.length !== totalChunks) {
      log(`Unexpected size of inventoryUploads ${inventoryUploads.length}, expected ${totalChunks}`);
      return null;
    }
    const sortedInventoryUploads = inventoryUploads.sort((a, b) => a.chunk - b.chunk);
    const collated = Buffer.alloc(totalChunks * chunkSize);
    let i = 0;
    while (i < totalChunks) {
      const inventoryUpload = sortedInventoryUploads[i];
      if (inventoryUpload.chunk !== i) {
        log(`Unexpected chunk ${inventoryUpload}, expected ${i}`);
        return null;
      }
      for (let j = 0; j < chunkSize; j++) {
        collated[i * chunkSize + j] = inventoryUpload.data[0][j];
      }
      i++;
    }
    return collated;
  },
  removeOldUploads: function(jobId, user) {
    return InventoryUpload.remove({
      uuid: jobId,
      user
    });
  },
  processJob: function(jobId, user, retryCount) {
    return new Promise((resolve, reject) => {
      log(`Processing Inventory Upload ${jobId}: ${user}`);

      if (!jobId) {
        return reject('jobId not specified');
      }
      if (!user) {
        return reject('user not specified');
      }
      InventoryUpload.find({
        uuid: jobId
      })
      .then((inventoryUploads) => {
        if (inventoryUploads.length === 0) {
          return ImportQuartzyInventory.removeOldUploads(jobId, user)
            .then(() => reject('Failed to find inventory uploads matching uuid', jobId));
        }
        const data = ImportQuartzyInventory.collateUploadsIfReady(inventoryUploads);

        if (!data) {
          if (retryCount > MAX_RETRY_COUNT) {
            return ImportQuartzyInventory.removeOldUploads(jobId, user)
              .then(() => reject(`jobId: ${jobId} retried ${MAX_RETRY_COUNT} times. Giving up.`));
          }
          // all uploads may not be complete, re-enqueue job
          PublishManager.queueMessage({
            job_id: jobId,
            user,
            retryCount: retryCount ? retryCount + 1 : 1
          }, queues.INVENTORY_QUEUE );

          return resolve();
        }
        const items = ImportQuartzyInventory.getItems(data);
        const user = inventoryUploads[0].user;
        const repository = inventoryUploads[0].repository;

        Entity.remove({ repository })
        .then(() => ImportQuartzyInventory.saveData(user, repository, items))
        .then(() => resolve())
        .catch(err => reject(err));
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
};

module.exports = ImportQuartzyInventory;
