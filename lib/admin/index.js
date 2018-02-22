import express from 'express';
import passport from 'passport';
import * as config from '../../src/config.js';
import OAuth2 from '../../app/controllers/oauth2.controller';

const routes = ((path) => {
  const router = express.Router();

  router.get('/auth/amazon', OAuth2.amazon_login);

  router.get('/auth/amazon/callback',
    ((req, res) => {
      OAuth2.amazon_login_callback(req, res, ((err, oauth) => {
        res.redirect(`${config.hostname_redirect}/admin/auth/amazon/success?access_token=${oauth.access_token}&refresh_token=${oauth.refresh_token}`);
      }))
    })
  );

  router.route('*')
    .get(function(req, res) {
      res.sendFile(path);
    });

  return router;
});

module.exports = routes;
