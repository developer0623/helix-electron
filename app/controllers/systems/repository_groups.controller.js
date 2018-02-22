import mongoose from 'mongoose';

import _ from 'lodash';
import RepositoryGroup from '../../../app/models/repository_group';

const RepositoryGroupsController = {
  GetAllRepositoryGroups: (req, res, next) => {
    RepositoryGroup.find()
    .then((repositoryGroups) =>{
      return res.status(200).json(repositoryGroups);
    })
    .catch((err) => {
      return next(err);
    })
  },
  GetRepositoriesPaged: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    const params = {
      query: { owner: req.params.company_id },
      paging: { page: page, limit: pageSize, sort: { name: 'asc' } },
    };
    RepositoryGroups.paginate(params.query, params.paging, (err, result) => {
      if (err) { return next(err); }

      return res.json({ results: result.docs,
        total: Number(result.total),
        limit: Number(result.limit),
        offset: Number(result.offset),
        current_page: Number(result.page),
        max_pages: Math.ceil(result.total / pageSize)
      });
    });
  }
}

module.exports = RepositoryGroupsController;
