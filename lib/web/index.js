import express from 'express';

var routes = function(path) {
  let router = express.Router();

  router.route('*')
    .get(function(req, res) {
      res.sendFile(path);
    });

  return router;
}

module.exports = routes;
