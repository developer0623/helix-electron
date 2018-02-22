import http from 'http';
import logger from 'logfmt';
import throng from 'throng';

import config from '../../src/config';
import app from './app';
import queues from '../queues';

http.globalAgent.maxSockets = Infinity;

function start() {
  logger.log({
    type: 'info',
    msg: 'starting worker',
    concurrency: config.concurrency
  });

  var instance = app(config);

  instance.on('ready', beginWork);
  process.on('SIGTERM', shutdown);

  function beginWork() {
    instance.on('lost', shutdown);
    instance.startScraping();
  }

  function shutdown() {
    logger.log({ type: 'info', msg: 'shutting down' });
    process.exit();
  }
}

throng(start, { workers: config.worker_concurrency });
