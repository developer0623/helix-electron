import mongoose from 'mongoose';
import jackrabbit from 'jackrabbit';
import logger from 'logfmt';
import { EventEmitter } from 'events';

let db = null;

function Connector(mongoUrl, rabbitUrl) {
  EventEmitter.call(this);

  const self = this;
  let readyCount = 0;

  this.db = mongoose.connect(mongoUrl);
  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    logger.log({ type: 'info', msg: 'connected', service: 'mongodb' });
    ready();
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    logger.log({ type: 'error', msg: err, service: 'mongodb' });
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    logger.log({ type: 'error', msg: 'disconnected', service: 'mongodb' });
    lost();
  });

  // If the Node process ends, close the Mongoose connection
  // process.on('SIGINT', function() {
  //   mongoose.connection.close(function () {
  //     console.log('Mongoose default connection disconnected through app termination');
  //     process.exit(0);
  //   });
  // });
  //   .on('connected', function() {
  //
  //   })
  //   .on('error', function(err) {
  //     logger.log({ type: 'error', msg: err, service: 'mongodb' });
  //   })
  //   .on('close', function(str) {
  //     logger.log({ type: 'error', msg: 'closed', service: 'mongodb' });
  //   })
  //   .on('disconnected', function() {
  //     logger.log({ type: 'error', msg: 'disconnected', service: 'mongodb' });
  //     lost();
  //   });

  this.queue = jackrabbit(rabbitUrl)
    .on('connected', () => {
      logger.log({ type: 'info', msg: 'connected', service: 'rabbitmq' });
      ready();
    })
    .on('error', (err) => {
      logger.log({ type: 'error', msg: err, service: 'rabbitmq' });
    })
    .on('disconnected', () => {
      logger.log({ type: 'error', msg: 'disconnected', service: 'rabbitmq' });
      lost();
    });

  function ready() {
    if (++readyCount === 2) {
      self.emit('ready');
    }
  }

  function lost() {
    self.emit('lost');
  }

  this.disconnect = function() {
    this.db.disconnect();
    this.queue.close();
  };
}

Connector.prototype = Object.create(EventEmitter.prototype);

module.exports = {
  createConnection: (mongoUrl, rabbitUrl) => {
    return new Connector(mongoUrl, rabbitUrl);
  },
  db: db
};
