import mongoose from 'mongoose';

import _ from 'lodash';
import Company from '../../../app/models/company';
import Repository from '../../../app/models/repository';
import RepositoryType from '../../../app/models/repository_type';

import queues from '../../../lib/queues';
import config from '../../../src/config';

import PublishManager from '../../../app/managers/publish_manager';

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
const RepositoriesController = {
  GetRepository: (req, res, next) => {
    Repository.findById(req.params.repository_id, (err, repository) => {
      if(err) { return next(err); }
      if(!repository) { return res.sendStatus(404); }

      res.status(200).json(repository);
    });
  },
  GetAllRepositories: (req, res, next) => {
    Repository.find({
      owner: req.params.company_id
    })
    .populate([{
      path: 'repository_type',
      model: 'RepositoryType'
    }])
    .then((repositories) =>{
      return res.status(200).json(repositories);
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
      query: { owner: req.params.company_id },
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
  GetAllRepositoriesByType: (req, res, next) => {
    getRepositoryType(req.params.repository_type)
    .then((repository_type) => {
      if(!repository_type) { return next(new Error("Repository Type Invalid")); }

      Repository.find({
        owner: req.params.company_id,
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
  CreateRepository: (req, res, next) => {
    getCompany(req.params.company_id)
    .then((company) => {
      if(!company) { return res.sendStatus(404); }

      const repository = new Repository();

      repository.name = req.body.name;
      repository.description = req.body.description;
      repository.default_response_format = req.body.default_response_format;
      repository.default_negative_response_format = req.body.default_negative_response_format;
      repository.default_positive_response_format = req.body.default_positive_response_format;
      repository.repository_type = req.body.repository_type;
      repository.data_set_type = req.body.data_set_type || "Custom";
      repository.entity_type = req.body.entity_type;
      repository.owner = req.params.company_id;
      repository.attributes = {};

      PublishManager.queueMessage({
        repository_id: repository._id
      }, queues.REPOSITORY_QUEUE );

      repository.save((err) => {
        if(err) { return next(err); }

        res.status(201).json(repository);
      });
    })
    .catch((err) => {
      next(err);
    });
  },
  UpdateRepository: (req, res, next) => {
    Repository.findById(req.params.repository_id)
    .then((repository) => {
      if(!repository) {
        return res.sendStatus(404);
      }

      repository.name = req.body.name;
      repository.description = req.body.description;
      repository.default_response_format = req.body.default_response_format;
      repository.default_negative_response_format = req.body.default_negative_response_format;
      repository.default_positive_response_format = req.body.default_positive_response_format;
      repository.isArchived = req.body.isArchived || false;

      repository.save((err) => {
        if(err) { return next(err); }

        PublishManager.queueMessage({
          repository_id: repository._id
        }, queues.REPOSITORY_QUEUE );

        res.status(200).json(repository);
      });
    })
    .catch((err) => {
      next(err);
    });
  },
  DeleteRepository: (req, res, next) => {
    getCompany(req.params.company_id)
    .then((company) => {
      if(!company) { return res.sendStatus(404); }

      Repository.findByIdAndRemove({ _id: req.params.repository_id }, (err) => {
        if(err) { return next(err); }

        return res.sendStatus(204);
      });
    })
    .catch((err) => {
      next(err);
    });
  }
}


module.exports = RepositoriesController;
