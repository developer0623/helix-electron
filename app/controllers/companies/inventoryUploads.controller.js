import mongoose from 'mongoose';

import _ from 'lodash';
import queues from '../../../lib/queues';
import config from '../../../src/config';
import InventoryUpload from '../../../app/models/inventoryUpload';

import PublishManager from '../../../app/managers/publish_manager';

const InventoryUploadsController = {
  PostInventoryUpload: (req, res, next) => {
    const inventoryUpload = new InventoryUpload();
    const {
      data,
      uuid,
      chunk,
      totalChunks,
      chunkSize
    } = req.body;

    const user = req.user;

    inventoryUpload.data = data;
    inventoryUpload.uuid = uuid;
    inventoryUpload.chunk = chunk;
    inventoryUpload.totalChunks = totalChunks;
    inventoryUpload.chunkSize = chunkSize;
    inventoryUpload.repository = req.params.repository_id;
    inventoryUpload.user = mongoose.Types.ObjectId(user._id);
    inventoryUpload.save((err, savedInventoryUpload) => {
      if (err) {
        return next(err);
      }
      if (chunk === totalChunks - 1) {
        // insert an inventoryJob into the queue with the last chunk
        PublishManager.queueMessage({
          job_id: uuid,
          user: user
        }, queues.INVENTORY_QUEUE );
      }
      return res.status(201).json({});
    });
  }
};

module.exports = InventoryUploadsController;
