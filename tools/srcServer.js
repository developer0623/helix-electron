import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev';
import favicon from 'serve-favicon';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import open from 'open';
import passport from 'passport';
import AWS from 'aws-sdk';
import session from 'express-session';
const alexaApp = require('../lib/alexa');
const connections = require('../src/connection.js');
const config = require('../src/config.js');

/* eslint-disable no-console */
module.exports = (shouldOpen) => {
  const port = 3000;
  const app = express();
  const compiler = webpack(webpackConfig);

  const accessKeyId =  process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;
  const awsRegion = process.env.AWS_REGION;

  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    awsRegion: awsRegion
  });
  // AWS.config = new AWS.Config();
  // AWS.config.accessKeyId = accessKeyId;
  // AWS.config.secretAccessKey = secretAccessKey;
  // AWS.config.region = awsRegion;

  connections.createConnection(config.mongo_url, config.rabbit_url);

  // Set view engine to ejs
  //app.set('view engine', 'html');

  app.use(favicon(path.join(__dirname, '../src/web/images/favicon.ico')));

  // Use express session support since OAuth2orize requires it
  app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
  }));

  app.use(compression());
   //.use(favicon(icon))
   //.use(logs(config.verbose))
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  const adminPath = path.join( __dirname, '../src/admin/index.html');
  const webPath = path.join( __dirname, '../src/web/index.html');

  app.use('/google', require('../lib/google'));
  app.use('/admin', require('../lib/admin')(adminPath));
  app.use('/api', require('../lib/api'));
  app.use('/', require('../lib/web')(webPath));

  app.use('/s3', require('react-s3-uploader/s3router')({
      bucket: `${process.env.AWS_BUCKET_NAME}`,
      ACL: 'private', // this is default
      uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  }));

  alexaApp.express({
    expressApp: app,
    router: express.Router(),
    checkCert: false,
    debug: true
  });

  app.listen(port, function(err) {
    if (err) {
      console.log(err);
    } else {
      if (shouldOpen) open(`http://localhost:${port}`);
    }
  });
};
