import Slack from 'slack-node';
const webhookUri = "https://hooks.slack.com/services/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"; //process.env.HELIXAI_SLACK_WEBHOOK_URI;

const SlackMessenger = {
  processMessage: (channel, message, username) => {
    return new Promise((resolve, reject) => {
      const slack = new Slack();
      slack.setWebhook(webhookUri);

      if (process.env.NODE_ENV != 'production') {
        channel = `${channel}staging`;
      }
      slack.webhook({
        channel: channel,
        username: username,
        text: message
      }, (err, response) => {
        if(err) { reject(err); }
        resolve();
      });
    });
  }
}

module.exports = SlackMessenger;
