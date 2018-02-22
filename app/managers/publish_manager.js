import queues from '../../lib/queues';
import config from '../../src/config';
import jackrabbit from 'jackrabbit';

function queueMessage(json, queue_name, cb) {
  try {
    const rabbit = jackrabbit(config.rabbit_url);

    rabbit.default()
    .publish(json, { key: queue_name })
    .on('drain', () => {
      rabbit.close;

      if(cb) {
        cb();
      }
    });
  } catch (e) {
    console.error("[AMQP] publish", e.message);
  }
}
const PublishManager = {
  queueMessage: queueMessage,
  queueMessageForSlack: (message, cb) => {
    queueMessage({
      channel: "#realtimeevents",
      username: "HelixBot",
      message: message
    }, queues.SLACK_QUEUE,
    cb);
  }
}

module.exports = PublishManager;
