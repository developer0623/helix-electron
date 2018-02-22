import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import favicon from 'serve-favicon';

const alexaApp = require('../lib/alexa');
const connections = require('../src/connection.js');
const config = require('../src/config.js');

/* eslint-disable no-console */

const PORT = process.env.PORT || 3000;
const app = express();

connections.createConnection(config.mongo_url, config.rabbit_url);

app.use(compression());
app.use(favicon(path.join(__dirname, '../src/web/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist/web'));
app.use(express.static('dist/admin'));

const adminPath = path.join( __dirname, '../dist/admin/index.html');
const webPath = path.join( __dirname, '../dist/web/index.html');

app.use('/google', require('../lib/google'));
app.use('/admin', require('../lib/admin')(adminPath));
app.use('/api', require('../lib/api'));
app.use('/', require('../lib/web')(webPath));

alexaApp.express({
  expressApp: app,
  router: express.Router(),
  checkCert: false,
  debug: true
});

app.listen(PORT);
