import _ from 'lodash';
import RepositoryType from '../../../app/models/repository_type';

const RepositoryTypesController = {
  GetRepositoryType: (req, res, next) => {
    RepositoryType.findById(req.params.repository_type_id)
    .populate('intents')
    .exec((err, repository_type) => {
      if(err) { return next(err); }
      if(!repository_type) { return res.sendStatus(404); }

      res.status(200).json(repository_type);
    });
  },
  GetRepositoryTypes: (req, res, next) => {
    RepositoryType.find({})
    .populate('intents')
    .exec((err, repository_types) => {
      if(err) { return next(err); }

      res.status(200).json(repository_types);
    });
  },
  GetRepositoryTypesPaged: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    let name;
    if(req.query.name) {
      name = req.query.name;
    }
    const params = {
      query: {},
      paging: { page: page, limit: pageSize, sort: { name: 'asc' }, populate: ['intents'] },
    };
    if(name) {
      params.query.type_name = { "$regex": `${name}`, "$options": "i" }
    }
    RepositoryType.paginate(params.query, params.paging, (err, result) => {
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
  CreateRepositoryType: (req, res, next) => {
    const repository_type = new RepositoryType();

    repository_type.type_name = req.body.type_name;
    repository_type.intents = req.body.intents || [];
    repository_type.slot_type = req.body.slot_type;

    repository_type.save((err) => {
      if(err) { return next(err); }

      res.status(201).json(repository_type);
    });
  },
  UpdateRepositoryType: (req, res, next) => {
    RepositoryType.findById({ _id: req.params.repository_type_id }, (err, repository_type) => {
      if(err) { return next(err); }
      if(!repository_type) { return res.sendStatus(404); }

      repository_type.type_name = req.body.type_name;
      repository_type.intents = req.body.intents || [];
      repository_type.slot_type = req.body.slot_type;
      console.log(repository_type);

      repository_type.save((err) => {
        if(err) { return next(err); }

        console.log(repository_type);
        res.status(200).json(repository_type);
      });
    });
  },
  DeleteRepositoryType: (req, res, next) => {
    RepositoryType.findByIdAndRemove({ _id: req.params.repository_type_id }, (err) => {
      if(err) { return next(err); }

      res.sendStatus(204);
    })
  }
}

module.exports = RepositoryTypesController;
