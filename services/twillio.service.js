import twilio from 'twilio';

const accountSid = 'AC09487eae49b536c13c3affca37ed06be'; // Your Account SID from www.twilio.com/console
const authToken = '57941450b9987a8ad83642a4f774213e';   // Your Auth Token from www.twilio.com/console

const client = new twilio.RestClient(accountSid, authToken);

const TwillioService = {
  SendSMS: function(toNumber, body) {
    return new Promise((resolve, reject) => {
      client.messages.create({
        body: body,
        to: toNumber,
        from: '+18047676317'
      })
      .then((message) => {
        resolve(message);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.stack);

        reject(err)
      })
    });
  }
}

module.exports = TwillioService;
