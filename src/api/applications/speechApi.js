import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

class SpeechApi {
  static convertTextToSpeech(applicationId, repositoryId, textToConvert) {
    return new Promise((resolve, reject) => {
      const url = `/api/applications/${applicationId}/speech`;

      authenticatedSuperAgent('POST', url)
      .send({
        textToConvert: textToConvert
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
}

export default SpeechApi;
