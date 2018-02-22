import AWS from 'aws-sdk';

var accessKeyId =  process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;
var awsRegion = process.env.AWS_REGION;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: awsRegion
})

const SpeechController = {
  convertToOgg: (req, res, next) => {
    let params = {
        'Text': `<speak>${req.body.textToConvert}</speak>`,
        'OutputFormat': 'ogg_vorbis',
        'VoiceId': 'Joanna',
        'TextType': 'ssml'
    }
    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
          console.log(err);

          res.sendStatus(500);
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
              res.json(data.AudioStream);
            } else {
              res.sendStatus(500);
            }
        } else {
          res.sendStatus(500);
        }
    });
  }
}

module.exports = SpeechController;
