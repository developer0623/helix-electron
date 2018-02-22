import config from '../src/config';
import connections from '../src/connection';
import queues from '../lib/queues';

import _ from 'lodash';

import RequestLog from '../app/models/request_log';

import PublishManager from '../app/managers/publish_manager';

function sendSlackJobMessage(message, cb) {
  PublishManager.queueMessage({
    channel: "#devops",
    username: "HelixBot",
    message: message
  }, queues.SLACK_QUEUE,
  cb);
}
const DailyScorecardProcessor = {
  generate: () => {
    return new Promise((resolve, reject) => {
      const start = new Date();
      start.setHours(0,0,0,0);

      const end = new Date();
      end.setHours(23,59,59,999);

      console.log(`Generating Daily Scorecard for ${start} - ${end}`);

      RequestLog.find({
        createdAt: { $gte: start, $lte: end }
      })
      .then((requestLogs) => {
        const numberOfRequests = requestLogs.length;
        const numberOfSuccesses = _.filter(requestLogs, { resolved: true}).length;
        const numberOfFailures = _.filter(requestLogs, { resolved: false}).length;

        const percent = numberOfSuccesses/numberOfRequests * 100 ;
        const numberOfVerified = _.filter(requestLogs, { verified: true}).length;

        let message = `Daily Scorecard for ${start}\n`
        message += `Number of Requests: ${numberOfRequests}\n`;
        message += `Success: ${numberOfSuccesses}\n`;
        message += `Failures: ${numberOfFailures}\n`;
        message += `Success Rate: ${percent}%\n`;
        message += `Number Verified: ${numberOfVerified}\n`;

        PublishManager.queueMessage({
          channel: "#dailyscorecard",
          username: "HelixBot",
          message: message
        }, queues.SLACK_QUEUE, () => {
          resolve();
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

const connector = connections.createConnection(config.mongo_url, config.rabbit_url);

connector.on('ready', () => {
  sendSlackJobMessage(`Job Started: Daily Scorecard`);

  DailyScorecardProcessor.generate()
  .then(() => {
    sendSlackJobMessage(`Job Complete: Daily Scorecard`, () => {
      process.exit();
    });
  })
  .catch((err) => {
    sendSlackJobMessage(`Job Failed: Daily Scorecard: ${err}`, () => {
      process.exit();
    });
  });
});
