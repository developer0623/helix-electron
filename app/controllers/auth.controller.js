import passport from 'passport';
import LocalStrategy from 'passport-local';
import { BasicStrategy } from 'passport-http';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as AmazonStrategy } from 'passport-amazon';
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';
import Client from '../models/oauth_client';
import Company from '../models/company';
import Repository from '../models/repository';
import RepositoryType from '../models/repository_type';
import Token from '../models/oauth_token';
import User from '../models/user';
import async from 'async';

import * as config from '../../src/config';

// Register serialialization function
passport.serializeUser(function(user, done) {
  console.log("Serializing User");

  done(null);
});

// Register deserialization function
passport.deserializeUser(function(id, done) {
  done(null);
});
passport.use(new LocalStrategy(
  (email_address, password, done) => {
    console.log(`Calling Local Strategy ${email_address}`);

    User.findOne({ email_address: username })
    .then((user) => {
      if (!user || !user.verifyPassword(password)) {
        res.status(401).send({minorCode: 1001});
      }

      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
  }
));
passport.use(new BasicStrategy(
  (email_address, password, callback) => {
    console.log(`Using Basic ${email_address}}`);

    User.findOne({ email_address: email_address })
    .then((user) => {
      if (!user) { return callback(null, false); }

      user.verifyPassword(password, (err, isMatch) => {
        if (err) { return callback(err); }
        if (!isMatch) { return callback(null, false); }

        callback(null, user);
      });
    })
    .catch((err) => {
      callback(err);
    });
  }
));
passport.use('client-basic', new BasicStrategy(
  (client_id, password, callback) => {
    console.log(`Using Client Basic ${client_id}`);

    Client.findOne({ client_id }, function (err, client) {
      if (err) { return callback(err); }

      // No client found with that id or bad password
      if (!client || client.secret !== password) { return callback(null, false); }

      // Success
      return callback(null, client);
    });
  }
));
passport.use('client-password', new ClientPasswordStrategy(
  (client_id, password, callback) => {
    console.log(`Using Client Password ${client_id}`);

    Client.findOne({ client_id }, function (err, client) {
      if (err) {
        console.log(`Failed ${err}`);

        return callback(err);
      }

      // No client found with that id or bad password
      if (!client || client.secret !== password) {
        console.log("Failed");

        return callback(null, false);
      }
      console.log(client);

      // Success
      return callback(null, client);
    });
  }
));
passport.use(new BearerStrategy(
  function(accessToken, callback) {
    console.log(`Using Bearer ${accessToken}`);

    Token.findOne({access_token: accessToken }, (err, token) => {
      if (err) { return callback(err); }

      // No token found
      if (!token) { return callback(null, false); }

      User.findOne({ _id: token.user })
      .then((user) => {
        if (!user) { return callback(null, false); }

        // Simple example with no scope
        callback(null,
          user,
          { scope: '*' }
        );
      })
      .catch((err) => {
        callback(err, false);
      });
    });
  }
));
passport.use(new AmazonStrategy({
    clientID: `${process.env.AMAZON_CLIENT_ID}`,
    clientSecret: `${process.env.AMAZON_CLIENT_SECRET}`,
    callbackURL: `${config.hostname}/admin/auth/amazon/callback`
  },
  ((accessToken, refreshToken, profile, done) => {
    const user = {
      id: 1
    };
    return done(null, user, { access_token: accessToken, refresh_token: refreshToken });
  })
));
module.exports = {
  isAuthenticated: passport.authenticate(['local', 'bearer'], { session : false }),
  isClientAuthenticated: passport.authenticate('client-password', {session : false}),
  isBearerAuthenticated: passport.authenticate('bearer', { session: false })
};
