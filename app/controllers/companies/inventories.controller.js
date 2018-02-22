import _ from 'lodash';
import queues from '../../../lib/queues';
import config from '../../../src/config';
import Company from '../../../app/models/company';
import Repository from '../../../app/models/repository';
import InventoryItem from '../../../app/models/inventoryItem';

const OWNER_TYPE = 'lab';

function getCompany(companyId) {
  return new Promise((resolve, reject) => {
    Company.findById(companyId)
    .then((company) => {
      resolve(company);
    })
    .catch((err) => {
      reject(err);
    })
  });
}
const InventoriesController = {
  GetInventoryItem: (req, res, next) => {
    InventoryItem.findOne({ _id: req.params.item_id }, (err, inventory) => {
      if(err) { return next(err); }
      if(!inventory) { return res.sendStatus(404); }

      res.status(200).json(inventory);
    });
  },
  GetAllInventories: (req, res, next) => {
    Lab.find({
      company: req.params.company_id
    })
    .populate('lab_members')
    .populate('inventories')
    .populate('repositories')
    .populate('application')
    .exec()
    .then((labs) => {
      return res.status(200).json(labs);
    })
    .catch((err) => {
      return next(err);
    })
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
    getCompany(req.params.company_id)
    .then((company) => {
      if(!company) { return res.sendStatus(404); }

      const repository = new Repository();

      repository.name = req.body.name;
      repository.repository_type = req.body.repository_type;
      repository.data_set_type = req.body.data_set_type || "Custom";
      repository.entity_type = req.body.entity_type;
      repository.owner_type = OWNER_TYPE;
      repository.owner = req.params.company_id;
      repository.attributes = {};

      repository.save((err) => {
        if(err) { return next(err); }

        res.status(201).json(repository);
      });
    });
  },
  UpdateInventory: (req, res, next) => {
    Repository.findById(req.params.inventory_id)
    .then((inventory) => {
      if(!inventory) { return res.sendStatus(404); }

      repository.name = req.body.name;

      repository.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(repository);
      });
    })
    .catch((err) => {
      next(err);
    });
  },
  DeleteInventory: (req, res, next) => {
    getCompany(req.params.company_id)
    .then((company) => {
      if(!company) { return res.sendStatus(404); }

      Repository.findByIdAndRemove({ _id: req.params.inventory_id }, (err) => {
        if(err) { return next(err); }

        company.inventories.splice(company.inventories.indexOf(req.params.inventory_id), 1);
        company.save()
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

module.exports = InventoriesController;
