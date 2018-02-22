import _ from 'lodash';
import queues from '../../../lib/queues';
import config from '../../../src/config';
import Lab from '../../../app/models/lab';
import Repository from '../../../app/models/repository';
import InventoryItem from '../../../app/models/inventoryItem';

const OWNER_TYPE = 'lab';

function getLab(labId) {
  return new Promise((resolve, reject) => {
    Lab.findById(labId)
    .then((lab) => {
      resolve(lab);
    })
    .catch((err) => {
      reject(err);
    })
  });
}
const InventoryController = {
  GetInventoryItem: (req, res, next) => {
    InventoryItem.findOne({ _id: req.params.item_id }, (err, inventory) => {
      if(err) { return next(err); }
      if(!inventory) { return res.sendStatus(404); }

      res.status(200).json(inventory);
    });
  },
  GetInventory: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    const params = {
      query: { user: req.user },
      paging: { page: page, limit: pageSize, sort: { createdAt: 'desc' }, populate: 'user' }
    };
    InventoryItem.paginate(params.query, params.paging, (err, result) => {
      if (err) { return next(err); }

      return res.json({ results: result.docs,
        total: Number(result.total),
        limit: Number(result.limit),
        offset: Number(result.offset),
        current_page: Number(result.page),
        max_pages: Math.ceil(result.total / pageSize)
      });
    });
  },
  CreateInventory: (req, res, next) => {
    getLab(req.params.lab_id)
    .then((lab) => {
      if(!lab) { return res.sendStatus(404); }

      const repository = new Repository();

      repository.name = req.body.name;
      repository.repository_type = req.body.repository_type;
      repository.data_set_type = req.body.data_set_type || "Custom";
      repository.entity_type = req.body.entity_type;
      repository.owner_type = OWNER_TYPE;
      repository.owner = lab;
      repository.attributes = {};

      repository.save((err) => {
        if(err) { return next(err); }

        lab.inventories.push(repository);
        lab.save()
        .then(() => {
          res.status(201).json(repository);
        })
        .catch((err) => {

          reject(err);
        });
      });
    });
  },
  UpdateInventory: (req, res, next) => {
    Repository.findById(req.params.inventory_id)
    .then((inventory) => {
      if(!inventory) { return res.sendStatus(404); }

      inventory.name = req.body.name;

      inventory.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(repository);
      });
    })
    .catch((err) => {
      next(err);
    });
  },
  DeleteInventory: (req, res, next) => {
    getLab(req.params.lab_id)
    .then((lab) => {
      if(!lab) { return res.sendStatus(404); }

      Repository.findByIdAndRemove({ _id: req.params.inventory_id }, (err) => {
        if(err) { return next(err); }

        lab.inventories.splice(lab.inventories.indexOf(req.params.inventory_id), 1);
        lab.save()
        .then(() => {
          return res.sendStatus(204);
        })
        .catch((err) => {
          reject(err);
        });
      });
    })
    .catch((err) => {
      next(err);
    });
  }
};

module.exports = InventoryController;
