import OAuthClient from '../../models/oauth_client.js';
import Client from '../../models/oauth_client';

const ClientsController = {
  CreateClient: (req, res, next) => {
    var client = new OAuthClient();

    client.name = req.body.name;
    client.client_id = req.body.client_id;
    client.secret = req.body.secret;

    client.save(function(err) {
      if (err) { return next(err); }

      res.status(201).json(client);
    });
  },
  UpdateClient: (req, res, next) => {
    OAuthClient.findById({ _id: req.params.client_id }, (err, client) => {
      if(err) { return next(err); }
      if(!client) { return res.sendStatus(404); }

      client.name = req.body.name;
      client.client_id = req.body.client_id;
      client.password = req.body.password;

      client.save((err) => {
        if(err) { return next(err); }

        res.status(200).json(client);
      });
    });
  },
  GetClients: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    let clientName;
    if(req.query.name) {
      clientName = req.query.name;
    }
    const params = {
      query: {},
      paging: { page: page, limit: pageSize, sort: { name: 'asc' } },
    };
    if(clientName) {
      params.query.name = { "$regex": `${clientName}`, "$options": "i" }
    }
    OAuthClient.paginate(params.query, params.paging, (err, result) => {
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
  GetClient: (req, res, next) => {
    OAuthClient.findById(req.params.client_id)
    .then((client) => {
      if(!client) { return res.sendStatus(404); }

      res.status(200).json(client);
    })
    .catch((err) => {
      if(err) { return next(err); }

      res.sendStatus(204);
    });
  },
  DeleteClient: (req, res, next) => {
    OAuthClient.findByIdAndRemove({ _id: req.params.client_id }, (err) => {
      if(err) { return next(err); }

      res.sendStatus(204);
    })
  }
};

module.exports = ClientsController;
