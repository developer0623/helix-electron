import oauth2orize from 'oauth2orize';
import passport from 'passport';
import User from '../models/user';
import Company from '../models/company';
import Client from '../models/oauth_client';
import OAuthCode from '../models/oauth_code';
import OAuthAccessToken from '../models/oauth_token';
import superagent from 'superagent';

import * as config from '../../src/config';

// Create OAuth 2.0 server
const server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function(client, callback) {
  return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient(function(id, callback) {
  Client.findOne({ _id: id }, function (err, client) {
    if (err) { return callback(err); }

    return callback(null, client);
  });
});
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, callback) {
  User.findOne({ email_address: username })
  .populate('company')
  .exec((err, user) => {
    if (err) { return callback(err); }

     // No user found with that username
     if (!user) { return callback(null, false); }

     // Make sure the password is correct
     user.verifyPassword(password, function(err, isMatch) {
       if (err) { return callback(err); }

       // Password did not match
       if (!isMatch) { return callback(null, false); }

       // Success
       var token = new OAuthAccessToken({
         access_token: uid(256),
         client: client,
         user: user
       });

       // Save the access token and check for errors
       token.save(function (err) {
         if (err) { return callback(err); }

         callback(null, token);
       });
     });
   });
}));
// Register authorization code grant type
server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, callback) => {
  // Create a new authorization code
  var auth_code = new OAuthCode({
    code: uid(16),
    client: client,
    redirect_uri: redirectUri,
    user: user
  });

  // Save the auth code and check for errors
  auth_code.save((err) => {
    if (err) { return callback(err); }

    callback(null, auth_code.code);
  });
}));
// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code((client, code, redirectUri, callback) => {
  OAuthCode.findOne({ code })
  .populate('user.company')
  .exec((err, authCode) => {
    if (err) { return callback(err); }
    if (authCode === undefined) { return callback(null, false); }
    if (client._id.toString() !== authCode.client_id) { return callback(null, false); }
    if (redirectUri !== authCode.redirect_uri) { return callback(null, false); }

    // Delete auth code now that it has been used
    authCode.remove(function (err) {
      if(err) { return callback(err); }

      // Create a new access token
      var token = new OAuthAccessToken({
        access_token: uid(256),
        client: authCode.client,
        user: authCode.user
      });

      // Save the access token and check for errors
      token.save(function (err) {
        if (err) { return callback(err); }

        callback(null, token);
      });
    });
  });
}));
function registerUser(req, res, callback) {

    const company = new Company({
        name: `${req.body.first_name} ${req.body.last_name}`
     });

     company.save()
    .then((savedCompany) => {
      console.log("savedCompany", savedCompany);
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.username,
        password: req.body.password,
        user_type: 'Organization',
        company: savedCompany

      });
      user.save()
      .then((savedUser) => {
        callback();
      })
      .catch((err) => {
        savedCompany.remove();

       callback(err);
      });
    })
    .catch((err) => {
      callback(err);
    });


    // user.save()
    // .then(() => {
    //   callback();
    // })
    // .catch((err) => {
    //   callback(err);
    // });
}
module.exports.amazon_login = (req, res, callback) => {
  const client_id = `${process.env.AMAZON_CLIENT_ID}`;
  const scopes = [
    'alexa::ask:models:readwrite',
    'alexa::ask:skills:readwrite',
    'alexa::ask:models:read',
    'alexa::ask:models:readwrite',
    'alexa::ask:skills:test'
  ];
  const state = "apple";
  const redirect_uri = `${config.hostname}/admin/auth/amazon/callback`;
  const response_type = "code";

  const url = `https://www.amazon.com/ap/oa?client_id=${client_id}&scope=${scopes.join(' ')}&response_type=${response_type}&state=${state}&redirect_uri=${redirect_uri}`;
  res.redirect(url);
}
module.exports.amazon_login_callback = (req, res, callback) => {
  Client.findOne({
    name: "Amazon Login Service"
  })
  .then((client) => {
    const code = req.query.code;
    const redirect_uri = `${config.hostname}/admin/auth/amazon/callback`;
    const payload = {
    	"grant_type": "authorization_code",
    	"code": code,
    	"redirect_uri": redirect_uri,
    	"client_id": `${process.env.AMAZON_CLIENT_ID}`,
    	"client_secret": `${process.env.AMAZON_CLIENT_SECRET}`
    }
    superagent('POST', 'https://api.amazon.com/auth/o2/token')
    .send(payload)
    .set('Content-Type', 'application/json')
    .end(function(err, res) {
      if(err) { callback(err); }

      callback(null, {
        access_token: res.body.access_token,
        refresh_token: res.body.refresh_token
      })
    })
  })
  .catch((err) => {
    callback(err);
  });
};
module.exports.authorization = [
  server.authorization((clientId, redirectUri, callback) => {

    Client.findOne({ client_id: clientId }, function (err, client) {
      if (err) { return callback(err); }

      return callback(null, client, redirectUri);
    });
  }),
  (req, res) => {
    res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
  }
]
module.exports.decision = [
  server.decision()
]
module.exports.token = [
  passport.authenticate(['client-password'], { session: false }),
  server.token(),
  server.errorHandler()
]
module.exports.register = [
  registerUser,
  passport.authenticate(['client-password'], { session: false }),
  server.token(),
  server.errorHandler()
]

function uid(len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
