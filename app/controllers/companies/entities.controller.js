import mongoose from 'mongoose';

import _ from 'lodash';
import Entity from '../../../app/models/entity';
import Repository from '../../../app/models/repository';
import queues from '../../../lib/queues';
import config from '../../../src/config';

import PublishManager from '../../../app/managers/publish_manager';

const EntitiesController = {
  GetEntity: (req, res, next) => {
    Entity.findById(req.params.entity_id, (err, entity) => {
      if(err) { return next(err); }
      if(!entity) { return res.sendStatus(404); }

      res.status(200).json(entity);
    });
  },
  GetEntities: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    const name = (req.query.name) ? req.query.name : null;
    const params = {
      query: { repository: req.params.repository_id },
      paging: { page: page, limit: pageSize, sort: { name: 'asc' } },
    };

    if(name) {
      params.query.name = { "$regex": `${name}`, "$options": "i" }
    }
    Entity.paginate(params.query, params.paging, (err, result) => {
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
  CreateEntity: (req, res, next) => {
    const entity = new Entity();

    entity.name = req.body.name;
    entity.type = req.body.type;
    entity.say_as = req.body.say_as;
    entity.display_as = req.body.display_as;
    entity.synonyms = req.body.synonyms;
    entity.attributes = req.body.attributes;
    entity.tags = req.body.tags;
    entity.owner = req.params.company_id;
    entity.repository = req.params.repository_id;

    entity.save((err) => {
      if(err) { return next(err); }
      PublishManager.queueMessage({
        entity_id: entity._id
      }, queues.ENTITY_UPDATE_QUEUE, () => {
        res.status(201).json(entity);
      });
    });
  },
  UploadEntities: (req, res, next) => {
    let entities = [];
    req.body.map((entity)=> {
      let newEntity = {};
      newEntity.name = entity.name;
      newEntity.type = entity.type;
      newEntity.say_as = entity.say_as;
      newEntity.display_as = entity.display_as;
      newEntity.synonyms = entity.synonyms;
      newEntity.attributes = entity.attributes;
      newEntity.tags = entity.tags;
      newEntity.owner = req.params.company_id;
      newEntity.repository = req.params.repository_id;
      entities.push(newEntity);
    });
    Entity.insertMany(entities, (error, docs) => {
      if(error) { return next(error); }
      PublishManager.queueMessage({
        repository_id: req.params.repository_id
      }, queues.ENTITY_UPDATE_QUEUE, () => {
        res.status(201).json(entities);
      });
    });
  },
  UpdateEntity: (req, res, next) => {
    Entity.findById(req.params.entity_id)
    .then((entity) => {
      if(!entity) { return res.sendStatus(404); }

      entity.name = req.body.name;
      entity.say_as = req.body.say_as;
      entity.display_as = req.body.display_as;
      entity.synonyms = req.body.synonyms || [];
      entity.attributes = req.body.attributes;
      entity.tags = req.body.tags || [];
      entity.response_format = req.body.response_format;
      entity.negative_response_format = req.body.negative_response_format;
      entity.owner = req.params.company_id;
      entity.repository = req.params.repository_id;

      entity.markModified('attributes');

      entity.save((err) => {
        if(err) { return next(err); }

        PublishManager.queueMessage({
          entity_id: entity._id
        }, queues.ENTITY_UPDATE_QUEUE, () => {
          res.status(200).json(entity);
        });
      });
    })
    .catch((err) => {
      next(err);
    });
  },
  DeleteEntity: (req, res, next) => {
    Entity.findByIdAndRemove({ _id: req.params.entity_id }, (err) => {
      if(err) { return next(err); }

      res.sendStatus(204);
    })
  },
  CreateEntityProperty: (req, res, next) => {
    Repository.findById(req.params.repository_id)
    .then((repository) => {
      if(!repository) { return res.sendStatus(404); }

      if(!repository.attributes.properties) {
        repository.attributes.properties = [];
      }
      let entityProperty = req.body;
      entityProperty._id = mongoose.Types.ObjectId().toString();
      entityProperty.name_lower = req.body.name.toLowerCase();

      repository.attributes.properties.push(entityProperty);
      repository.markModified('attributes');

      repository.save((err) => {
        if(err) { return next(err); }

        res.status(201).json(entityProperty);
      });
    })
    .catch((err) => {
      next(err);
    });
  },
  UpdateEntityProperty: (req, res, next) => {
    Repository.findById(req.params.repository_id)
    .then((repository) => {
      if(!repository) { return res.sendStatus(404); }

      const attributes = repository.attributes;

      if(!attributes) { return res.sendStatus(404); }

      const properties = attributes.properties;

      if(!properties) { return res.sendStatus(404); }

      let entityProperty = _.find(properties, { _id: req.params.entity_property_id });
      const index = _.findIndex(properties, { _id: req.params.entity_property_id });

      if(index < 0) { return res.sendStatus(404); }

      const updateEntityProperty = req.body;
      repository.attributes.properties[index] = updateEntityProperty;
      repository.markModified('attributes');

      repository.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(updateEntityProperty);
      });
    })
    .catch((err) => {
      next(err);
    });
  },
  DeleteEntityProperty: (req, res, next) => {
    Repository.findById(req.params.repository_id)
    .then((repository) => {
      if(!repository) { return res.sendStatus(404); }

      const attributes = repository.attributes;

      if(!attributes) { return res.sendStatus(404); }

      const properties = attributes.properties;

      if(!properties) { return res.sendStatus(404); }

      let entityProperty = _.find(properties, { _id: req.params.entity_property_id });
      const index = _.findIndex(properties, { _id: req.params.entity_property_id });

      if(index < 0) { return res.sendStatus(404); }

      _.remove(repository.attributes.properties, { _id: req.params.entity_property_id });

      repository.markModified('attributes');

      repository.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(entityProperty);
      });
    })
    .catch((err) => {
      next(err);
    });
  }
};

module.exports = EntitiesController;
