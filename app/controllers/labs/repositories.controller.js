import mongoose from 'mongoose';

import _ from 'lodash';
import Lab from '../../../app/models/lab';
import Repository from '../../../app/models/repository';
import RepositoryType from '../../../app/models/repository_type';

import queues from '../../../lib/queues';
import config from '../../../src/config';

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
function getRepositoryType(repositoryType) {
  return new Promise((resolve, reject) => {
    RepositoryType.findOne({
      type_name: repositoryType
    })
    .then((repository_type) => {
      resolve(repository_type);
    })
    .catch((err) => {
      reject(err);
    })
  });
}
const LabRepositoriesController = {
  GetRepository: (req, res, next) => {
    Repository.findById(req.params.repository_id, (err, repository) => {
      if(err) { return next(err); }
      if(!repository) { return res.sendStatus(404); }

      res.status(200).json(repository);
    });
  },
  GetAllRepositories: (req, res, next) => {
    Repository.find({
      owner: req.params.lab_id
    })
    .then((repositories) =>{
      return res.status(200).json(repositories);
    })
    .catch((err) => {
      return next(err);
    })
  },
  GetAllRepositoriesByType: (req, res, next) => {
    getRepositoryType(req.params.repository_type)
    .then((repository_type) => {
      if(!repository_type) { return next(new Error("Repository Type Invalid")); }

      Repository.find({
        owner: req.params.lab_id,
        repository_type: repository_type
      })
      .then((repositories) =>{
        return res.status(200).json(repositories);
      })
      .catch((err) => {
        return next(err);
      })
    })
    .catch((err) => {
      return next(err);
    })
  },
  GetRepositoriesPaged: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    const name = (req.query.name) ? req.query.name : null;
    const params = {
      query: { owner: req.params.lab_id },
      paging: { page: page, limit: pageSize, sort: { name: 'asc' } },
    };

    if(name) {
      params.query.name = { "$regex": `${name}`, "$options": "i" }
    }
    Repository.paginate(params.query, params.paging, (err, result) => {
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
  AddRepository: (req, res, next) => {
    getLab(req.params.lab_id)
    .then((lab) => {
      if(!lab) { return res.sendStatus(404); }

      lab.repositories.push(req.body.repository_id);
      lab.save();
    })
    .then((savedLab) => {
      res.status(201).json(savedLab);
    })
    .catch((err) => {
      next(err);
    })
  },
  CreateRepository: (req, res, next) => {
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

        lab.repositories.push(repository);
        lab.save()
        .then(() => {
          res.status(201).json(repository);
        })
        .catch((err) => {

          next(err);
        });
      });
    });
  },
  UpdateRepository: (req, res, next) => {
    getLab(req.params.lab_id)
    .then((lab) => {
      if(!lab) { return res.sendStatus(404); }

      Repository.findById(req.params.repository_id)
      .then((repository) => {
        if(!repository) { return res.sendStatus(404); }

        repository.name = req.body.name;
        repository.repository_type = req.body.repository_type;
        repository.data_set_type = req.body.data_set_type || "Custom";
        repository.entity_type = req.body.entity_type;
        repository.owner_type = OWNER_TYPE;
        repository.owner = lab;

        repository.save((err) => {
          if(err) { return next(err); }

          res.status(200).json(repository);
        });
      })
      .catch((err) => {
        next(err);
      });
    });
  },
  DeleteRepository: (req, res, next) => {
    Repository.findByIdAndRemove({ _id: req.params.repository_id }, (err) => {
      if(err) { return next(err); }

      res.sendStatus(204);
    })
  }
}


module.exports = LabRepositoriesController;
