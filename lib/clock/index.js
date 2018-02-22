import { CronJob } from 'cron';
import app from '../worker/app';
import config from '../../src/config';
import queues from '../queues';

const instance = app(config);

const queueReminders = function() {
  try {
    instance.connections.queue
    .default()
    .publish({}, { key: queues.REMINDER_QUEUE });
  } catch (e) {
    console.error("[AMQP] publish", e.message);
  }
}
const queueApplicationBuildStatus = function() {
  try {
    instance.connections.queue
    .default()
    .publish({}, { key: queues.APPLICATION_BUILD_STATUS_QUEUE });
  } catch (e) {
    console.error("[AMQP] publish", e.message);
  }
}

instance.on('ready', queueJobs);
process.on('SIGTERM', shutdown);

function queueJobs() {
  instance.on('lost', shutdown);

  setInterval(queueReminders, 60 * 1000);
  setInterval(queueApplicationBuildStatus, 60 * 1000);

  console.log("Starting Clock");
}

function shutdown() {
  logger.log({ type: 'info', msg: 'shutting down' });

  console.log("************ ERROR ***************");

  process.exit();
}
